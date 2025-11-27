// ============================================================================
// PATCH 18: Content-Based Question System
// Loads vocabulary JSON files and creates AFOQT practice tests
// ============================================================================

// Global question registry: questions[subjectId][subtopicId][difficulty] = Question[]
const questionRegistry = {};

// Patch 18 configuration
let patch18Config = null;

/**
 * Load Patch 18 configuration from JSON file
 */
async function loadPatch18Config() {
    try {
        const response = await fetch('./Test Content/Patch_18.json');
        if (!response.ok) {
            console.warn('Patch 18 config not found');
            return null;
        }
        patch18Config = await response.json();
        console.log('✓ Patch 18 config loaded');
        return patch18Config;
    } catch (error) {
        console.error('Failed to load Patch 18 config:', error);
        return null;
    }
}

/**
 * Parse filename to extract subtopicId and difficulty
 * Pattern: <subtopicId>_<difficulty>_part<N>.json
 */
function parseFilename(filename) {
    // Remove .json extension
    const name = filename.replace('.json', '');
    
    // Split by underscore
    const parts = name.split('_');
    
    // Find part index (partN)
    let partIndex = -1;
    for (let i = parts.length - 1; i >= 0; i--) {
        if (parts[i].startsWith('part')) {
            partIndex = i;
            break;
        }
    }
    
    if (partIndex === -1) {
        console.warn('Invalid filename format:', filename);
        return null;
    }
    
    // Everything before 'part' is subtopicId, part after is difficulty
    const difficulty = parts[partIndex - 1];
    const subtopicId = parts.slice(0, partIndex - 1).join('_');
    const part = parseInt(parts[partIndex].replace('part', ''));
    
    return { subtopicId, difficulty, part };
}

/**
 * Find subject for a given subtopicId using Patch 18 mappings
 */
function findSubjectForSubtopic(subtopicId) {
    if (!patch18Config) return null;
    
    for (const subject of patch18Config.subjects) {
        const mapping = subject.mappedGameSubtopics.find(m => m.subtopicId === subtopicId);
        if (mapping) {
            return {
                subjectId: subject.id,
                displayName: subject.displayName,
                isAfoqtOfficial: subject.isAfoqtOfficialSubject,
                mapping: mapping
            };
        }
    }
    return null;
}

/**
 * Load a single vocabulary JSON file
 */
async function loadVocabularyFile(filename) {
    try {
        const response = await fetch(`./Test Content/Vocabulary/${filename}`);
        if (!response.ok) {
            console.warn(`Failed to load ${filename}`);
            return null;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        return null;
    }
}

/**
 * Load a single math knowledge JSON file
 */
async function loadMathKnowledgeFile(filename) {
    try {
        const response = await fetch(`./Test Content/Math/${filename}`);
        if (!response.ok) {
            console.warn(`Failed to load ${filename}`);
            return null;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        return null;
    }
}

/**
 * Load all vocabulary files and build question registry
 */
async function loadAllVocabularyContent() {
    console.log('Loading vocabulary content...');
    
    // Get list of vocabulary files (hardcoded from directory listing)
    const vocabularyFiles = [
        'synonyms_beginner_part1.json', 'synonyms_beginner_part2.json', 'synonyms_beginner_part3.json', 'synonyms_beginner_part4.json',
        'synonyms_advanced_part1.json', 'synonyms_advanced_part2.json', 'synonyms_advanced_part3.json', 'synonyms_advanced_part4.json',
        'synonyms_expert_part1.json', 'synonyms_expert_part2.json', 'synonyms_expert_part3.json', 'synonyms_expert_part4.json',
        'antonyms_beginner_part1.json', 'antonyms_beginner_part2.json', 'antonyms_beginner_part3.json', 'antonyms_beginner_part4.json',
        'antonyms_advanced_part1.json', 'antonyms_advanced_part2.json', 'antonyms_advanced_part3.json', 'antonyms_advanced_part4.json',
        'antonyms_expert_part1.json', 'antonyms_expert_part2.json', 'antonyms_expert_part3.json', 'antonyms_expert_part4.json',
        'confusing_word_pairs_beginner_part1.json', 'confusing_word_pairs_beginner_part2.json', 'confusing_word_pairs_beginner_part3.json', 'confusing_word_pairs_beginner_part4.json',
        'confusing_word_pairs_advanced_part1.json', 'confusing_word_pairs_advanced_part2.json', 'confusing_word_pairs_advanced_part3.json', 'confusing_word_pairs_advanced_part4.json',
        'confusing_word_pairs_expert_part1.json', 'confusing_word_pairs_expert_part2.json', 'confusing_word_pairs_expert_part3.json', 'confusing_word_pairs_expert_part4.json',
        'vocabulary_in_context_beginner_part1.json', 'vocabulary_in_context_beginner_part2.json', 'vocabulary_in_context_beginner_part3.json', 'vocabulary_in_context_beginner_part4.json',
        'vocabulary_in_context_advanced_part1.json', 'vocabulary_in_context_advanced_part2.json', 'vocabulary_in_context_advanced_part3.json', 'vocabulary_in_context_advanced_part4.json',
        'vocabulary_in_context_expert_part1.json', 'vocabulary_in_context_expert_part2.json', 'vocabulary_in_context_expert_part3.json', 'vocabulary_in_context_expert_part4.json',
        'word_roots_affixes_beginner_part1.json', 'word_roots_affixes_beginner_part2.json',
        'word_roots_affixes_advanced_part1.json', 'word_roots_affixes_advanced_part2.json',
        'word_roots_affixes_expert_part1.json', 'word_roots_affixes_expert_part2.json',
        'highfreq_vocab_beginner_part1.json', 'highfreq_vocab_beginner_part2.json',
        'highfreq_vocab_advanced_part1.json', 'highfreq_vocab_advanced_part2.json',
        'highfreq_vocab_expert_part1.json', 'highfreq_vocab_expert_part2.json',
        'sentence_completion_beginner_part1.json', 'sentence_completion_beginner_part2.json',
        'sentence_completion_advanced_part1.json', 'sentence_completion_advanced_part2.json',
        'sentence_completion_expert_part1.json', 'sentence_completion_expert_part2.json',
        'verbal_analogies_beginner_part1.json', 'verbal_analogies_beginner_part2.json',
        'verbal_analogies_advanced_part1.json', 'verbal_analogies_advanced_part2.json',
        'verbal_analogies_expert_part1.json', 'verbal_analogies_expert_part2.json'
    ];
    
    let loadedCount = 0;
    let errorCount = 0;
    
    // Load all files in parallel
    const loadPromises = vocabularyFiles.map(async (filename) => {
        const data = await loadVocabularyFile(filename);
        if (!data) {
            errorCount++;
            return;
        }
        
        // Parse filename
        const parsed = parseFilename(filename);
        if (!parsed) {
            errorCount++;
            return;
        }
        
        // Find subject mapping
        const subjectInfo = findSubjectForSubtopic(parsed.subtopicId);
        if (!subjectInfo) {
            console.warn(`No subject mapping found for subtopic: ${parsed.subtopicId}`);
            errorCount++;
            return;
        }
        
        // Initialize registry structure
        if (!questionRegistry[subjectInfo.subjectId]) {
            questionRegistry[subjectInfo.subjectId] = {};
        }
        if (!questionRegistry[subjectInfo.subjectId][parsed.subtopicId]) {
            questionRegistry[subjectInfo.subjectId][parsed.subtopicId] = {
                beginner: [],
                advanced: [],
                expert: []
            };
        }
        
        // Add questions to registry
        if (data.questions && Array.isArray(data.questions)) {
            questionRegistry[subjectInfo.subjectId][parsed.subtopicId][parsed.difficulty].push(...data.questions);
            loadedCount++;
        }
    });
    
    await Promise.all(loadPromises);
    
    console.log(`✓ Loaded ${loadedCount} vocabulary files (${errorCount} errors)`);
    console.log('Question registry:', questionRegistry);
    
    return questionRegistry;
}

/**
 * Load all math knowledge files and build question registry
 */
async function loadAllMathKnowledgeContent() {
    console.log('Loading math knowledge content...');
    
    // Get list of math knowledge files (hardcoded from directory listing)
    const mathFiles = [
        'word_problems_equation_setup_beginner_part1.json', 'word_problems_equation_setup_beginner_part2.json',
        'absolute_value_beginner_part1.json', 'absolute_value_beginner_part2.json',
        'coordinate_geometry_beginner_part1.json', 'coordinate_geometry_beginner_part2.json',
        'distributive_foil_beginner_part1.json', 'distributive_foil_beginner_part2.json',
        'evaluate_expressions_beginner_part1.json', 'evaluate_expressions_beginner_part2.json',
        'evaluate_expressions_advanced_part1.json',
        'exponents_roots_beginner_part1.json', 'exponents_roots_beginner_part2.json',
        'factoring_beginner_part1.json', 'factoring_beginner_part2.json',
        'fractions_beginner_part1.json', 'fractions_beginner_part2.json',
        'function_evaluation_beginner_part1.json', 'function_evaluation_beginner_part2.json',
        'functions_beginner_part1.json', 'functions_beginner_part2.json',
        'geometry_basics_beginner_part1.json', 'geometry_basics_beginner_part2.json',
        'graph_interpretation_beginner_part1.json', 'graph_interpretation_beginner_part2.json',
        'graphing_linear_functions_beginner_part1.json', 'graphing_linear_functions_beginner_part2.json',
        'inequalities_beginner_part1.json', 'inequalities_beginner_part2.json',
        'inequalities_advanced_part1.json', 'inequalities_advanced_part2.json',
        'inequalities_expert_part1.json', 'inequalities_expert_part2.json',
        'linear_equations_beginner_part1.json', 'linear_equations_beginner_part2.json',
        'number_sets_beginner_part1.json', 'number_sets_beginner_part2.json',
        'order_of_operations_beginner_part1.json', 'order_of_operations_beginner_part2.json',
        'polygons_and_angles_beginner_part1.json', 'polygons_and_angles_beginner_part2.json',
        'polynomials_beginner_part1.json', 'polynomials_beginner_part2.json',
        'probability_beginner_part1.json', 'probability_beginner_part2.json',
        'quadratic_equations_beginner_part1.json', 'quadratic_equations_beginner_part2.json',
        'radicals_beginner_part1.json', 'radicals_beginner_part2.json',
        'ratio_and_proportion_beginner_part1.json', 'ratio_and_proportion_beginner_part2.json',
        'rational_expressions_beginner_part1.json', 'rational_expressions_beginner_part2.json',
        'sequences_beginner_part1.json', 'sequences_beginner_part2.json',
        'slope_beginner_part1.json', 'slope_beginner_part2.json',
        'statistics_beginner_part1.json', 'statistics_beginner_part2.json',
        'systems_linear_beginner_part1.json', 'systems_linear_beginner_part2.json',
        'transformations_beginner_part1.json', 'transformations_beginner_part2.json'
    ];
    
    let loadedCount = 0;
    let errorCount = 0;
    
    // Load all files in parallel
    const loadPromises = mathFiles.map(async (filename) => {
        const data = await loadMathKnowledgeFile(filename);
        if (!data) {
            errorCount++;
            return;
        }
        
        // Parse filename
        const parsed = parseFilename(filename);
        if (!parsed) {
            errorCount++;
            return;
        }
        
        // Find subject mapping
        const subjectInfo = findSubjectForSubtopic(parsed.subtopicId);
        if (!subjectInfo) {
            console.warn(`No subject mapping found for subtopic: ${parsed.subtopicId}`);
            errorCount++;
            return;
        }
        
        // Initialize registry structure
        if (!questionRegistry[subjectInfo.subjectId]) {
            questionRegistry[subjectInfo.subjectId] = {};
        }
        if (!questionRegistry[subjectInfo.subjectId][parsed.subtopicId]) {
            questionRegistry[subjectInfo.subjectId][parsed.subtopicId] = {
                beginner: [],
                advanced: [],
                expert: []
            };
        }
        
        // Add questions to registry
        if (data.questions && Array.isArray(data.questions)) {
            questionRegistry[subjectInfo.subjectId][parsed.subtopicId][parsed.difficulty].push(...data.questions);
            loadedCount++;
        }
    });
    
    await Promise.all(loadPromises);
    
    console.log(`✓ Loaded ${loadedCount} math knowledge files (${errorCount} errors)`);
    console.log('Math question registry:', questionRegistry.math_knowledge);
    
    return questionRegistry;
}

/**
 * Convert JSON question format to app question format
 */
function convertJsonQuestionToAppFormat(jsonQuestion) {
    // JSON format: {id, question, choices: {A, B, C, D}, answer, explanation, uiSpec}
    // App format: {prompt, options: [], correctIndex, explanation, id, uiSpec}
    
    const choices = jsonQuestion.choices;
    const options = [choices.A, choices.B, choices.C, choices.D];
    const correctIndex = ['A', 'B', 'C', 'D'].indexOf(jsonQuestion.answer);
    
    const converted = {
        id: jsonQuestion.id, // Preserve question ID for tracking
        prompt: jsonQuestion.question,
        options: options,
        correctIndex: correctIndex,
        explanation: jsonQuestion.explanation
    };
    
    // Preserve uiSpec for math UI rendering
    if (jsonQuestion.uiSpec) {
        converted.uiSpec = jsonQuestion.uiSpec;
    }
    
    // Preserve fastStrategy for quick tips display
    if (jsonQuestion.fastStrategy) {
        converted.fastStrategy = jsonQuestion.fastStrategy;
    }
    
    // Preserve steps for step-by-step solution display
    if (jsonQuestion.steps) {
        converted.steps = jsonQuestion.steps;
    }
    
    return converted;
}

/**
 * Get random questions from registry for a specific subject/subtopic/difficulty
 */
function getQuestionsFromRegistry(subjectId, subtopicId, difficulty, count = 10) {
    if (!questionRegistry[subjectId] || 
        !questionRegistry[subjectId][subtopicId] || 
        !questionRegistry[subjectId][subtopicId][difficulty]) {
        console.warn(`No questions found for ${subjectId}/${subtopicId}/${difficulty}`);
        return [];
    }
    
    const pool = questionRegistry[subjectId][subtopicId][difficulty];
    if (pool.length === 0) {
        return [];
    }
    
    // Shuffle and take random questions
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(count, shuffled.length));
    
    // Convert to app format and add metadata
    return selected.map(q => {
        const converted = convertJsonQuestionToAppFormat(q);
        converted.subtopicId = subtopicId;
        converted.difficulty = difficulty;
        return converted;
    });
}

/**
 * Get questions with spaced repetition prioritization
 * Prioritizes questions due for review, then fills with new/random questions
 */
async function getQuestionsWithSpacedRepetition(subjectId, subtopicId, difficulty, count = 10, playerId = null) {
    if (!playerId || typeof afoqtDB === 'undefined') {
        // Fallback to regular selection if no player or DB not available
        return getQuestionsFromRegistry(subjectId, subtopicId, difficulty, count);
    }
    
    try {
        // Get questions due for review
        const dueQuestions = await afoqtDB.getQuestionsDueForReview(playerId, count);
        
        // Filter due questions for this subtopic and difficulty
        const relevantDue = dueQuestions.filter(q => 
            q.subtopicId === subtopicId && q.difficulty === difficulty
        );
        
        // Get pool of all questions for this subtopic/difficulty
        const allQuestions = getQuestionsFromRegistry(subjectId, subtopicId, difficulty, 100);
        
        // Create Map for O(1) lookups by question ID
        const questionsById = new Map(allQuestions.map(q => [q.id, q]));
        
        // Get seen question IDs
        const seenIds = new Set(dueQuestions.map(q => q.questionId));
        
        // Prioritize: 1) Due questions, 2) Unseen questions, 3) Random seen questions
        const result = [];
        const resultIds = new Set();
        
        // Add due questions first (O(1) lookup per question)
        for (const dueQ of relevantDue) {
            const match = questionsById.get(dueQ.questionId);
            if (match && result.length < count) {
                result.push(match);
                resultIds.add(match.id);
            }
        }
        
        // Fill with unseen questions
        const unseenQuestions = allQuestions.filter(q => !seenIds.has(q.id));
        const shuffledUnseen = [...unseenQuestions].sort(() => Math.random() - 0.5);
        for (const q of shuffledUnseen) {
            if (result.length >= count) break;
            result.push(q);
            resultIds.add(q.id);
        }
        
        // If still need more, add random questions from pool
        const shuffledAll = [...allQuestions].sort(() => Math.random() - 0.5);
        for (const q of shuffledAll) {
            if (result.length >= count) break;
            if (!resultIds.has(q.id)) {
                result.push(q);
                resultIds.add(q.id);
            }
        }
        
        return result;
    } catch (error) {
        console.error('Error with spaced repetition:', error);
        return getQuestionsFromRegistry(subjectId, subtopicId, difficulty, count);
    }
}


/**
 * Generate AFOQT practice test questions based on Patch 18 config
 */
function generateAfoqtPracticeTest(practiceTestConfig) {
    const questions = [];
    const policy = practiceTestConfig.questionSelectionPolicy;
    const totalQuestions = policy.defaultTestLength;
    
    // Calculate question counts per difficulty
    const counts = {
        beginner: Math.floor(totalQuestions * policy.difficultyDistribution.beginner),
        advanced: Math.floor(totalQuestions * policy.difficultyDistribution.advanced),
        expert: Math.floor(totalQuestions * policy.difficultyDistribution.expert)
    };
    
    // Adjust for rounding errors
    const total = counts.beginner + counts.advanced + counts.expert;
    if (total < totalQuestions) {
        counts.advanced += (totalQuestions - total);
    }
    
    // Collect questions from all included subtopics
    for (const subtopicId of policy.subtopicsIncluded) {
        for (const difficulty of ['beginner', 'advanced', 'expert']) {
            if (counts[difficulty] > 0) {
                const questionsPerSubtopic = Math.ceil(counts[difficulty] / policy.subtopicsIncluded.length);
                const subtopicQuestions = getQuestionsFromRegistry(
                    practiceTestConfig.subjectId,
                    subtopicId,
                    difficulty,
                    questionsPerSubtopic
                );
                questions.push(...subtopicQuestions);
            }
        }
    }
    
    // Shuffle and limit to exact test length
    const shuffled = questions.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, totalQuestions);
}

/**
 * Create AFOQT practice test topics from Patch 18 config
 */
function createAfoqtPracticeTestTopics() {
    if (!patch18Config || !patch18Config.afoqtPracticeTests) {
        return [];
    }
    
    const practiceTests = [];
    
    for (const testConfig of patch18Config.afoqtPracticeTests.subjectConfigs) {
        practiceTests.push({
            id: testConfig.practiceTestId,
            name: testConfig.displayName,
            description: `Official ${testConfig.displayName} practice test with ${testConfig.questionSelectionPolicy.defaultTestLength} questions`,
            subjectId: testConfig.subjectId,
            isPracticeTest: true,
            testConfig: testConfig,
            generateQuestion: (difficulty) => {
                // For practice tests, generate all questions at once
                // This will be called by startQuiz, but we'll handle it differently
                return null; // Handled by custom logic
            }
        });
    }
    
    return practiceTests;
}

/**
 * Initialize Patch 18 system
 */
async function initializePatch18() {
    console.log('Initializing Patch 18...');
    
    // Load config
    await loadPatch18Config();
    if (!patch18Config) {
        console.warn('Patch 18 not available');
        return false;
    }
    
    // Load vocabulary content
    await loadAllVocabularyContent();
    
    // Load math knowledge content
    await loadAllMathKnowledgeContent();
    
    console.log('✓ Patch 18 initialized');
    return true;
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializePatch18,
        createAfoqtPracticeTestTopics,
        getQuestionsFromRegistry,
        generateAfoqtPracticeTest,
        questionRegistry
    };
}
