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
        console.log('[Patch 18] Attempting to load from patches folder...');
        // Try new patches folder first, then fallback for backwards compatibility
        let response = await fetch(encodeURI('/AFOQT-app/Test Content/patches/Patch_18.json'));
        if (!response.ok) {
            console.log('[Patch 18] Not found in patches folder, trying legacy path...');
            response = await fetch(encodeURI('/AFOQT-app/Test Content/Patch_18.json'));
        }
        if (!response.ok) {
            console.warn('[Patch 18] Config not found in either location');
            return null;
        }
        patch18Config = await response.json();
        console.log('✓ Patch 18 config loaded successfully');
        return patch18Config;
    } catch (error) {
        console.error('[Patch 18] Failed to load config:', error);
        return null;
    }
}

// Patch 19 configuration (Arithmetic Reasoning)
let patch19Config = null;

// Patch 20 configuration (Reading Comprehension)
let patch20Config = null;

// Patch 21 configuration (Instrument Comprehension)
let patch21Config = null;

// Patch 22 configuration (Table Reading)
let patch22Config = null;

// Patch 24 configuration (Scoped Table Reading renderer)
let patch24Config = null;

// Patch: Block Counting (uiSpec-based stacks)
let patchBlockCountingConfig = null;

async function loadPatch19Config() {
    try {
        // Prefer centralized patches folder, fallback to legacy Arithmetic path
        let response = await fetch(encodeURI('/AFOQT-app/Test Content/patches/Patch_19.json'));
        if (!response.ok) {
            response = await fetch(encodeURI('/AFOQT-app/Test Content/Arithmetic/Patch_19.json'));
        }
        if (!response.ok) {
            console.warn('Patch 19 config not found');
            return null;
        }
        patch19Config = await response.json();
        console.log('✓ Patch 19 config loaded');
        return patch19Config;
    } catch (error) {
        console.error('Failed to load Patch 19 config:', error);
        return null;
    }
}

async function loadPatch20Config() {
    try {
        let response = await fetch(encodeURI('/AFOQT-app/Test Content/patches/Patch_20.json'));
        if (!response.ok) {
            response = await fetch(encodeURI('/AFOQT-app/Test Content/Patch_20.json'));
        }
        if (!response.ok) {
            console.warn('Patch 20 config not found');
            return null;
        }
        patch20Config = await response.json();
        console.log('✓ Patch 20 config loaded');
        return patch20Config;
    } catch (error) {
        console.error('Failed to load Patch 20 config:', error);
        return null;
    }
}

async function loadPatch21Config() {
    try {
        let response = await fetch(encodeURI('/AFOQT-app/Test Content/patches/Patch_21.json'));
        if (!response.ok) {
            response = await fetch(encodeURI('/AFOQT-app/Test Content/Patch_21.json'));
        }
        if (!response.ok) {
            console.warn('Patch 21 config not found');
            return null;
        }
        patch21Config = await response.json();
        console.log('✓ Patch 21 config loaded');
        return patch21Config;
    } catch (error) {
        console.error('Failed to load Patch 21 config:', error);
        return null;
    }
}

async function loadPatch22Config() {
    try {
        let response = await fetch(encodeURI('/AFOQT-app/Test Content/patches/Patch_22.json'));
        if (!response.ok) {
            response = await fetch(encodeURI('/AFOQT-app/Test Content/Patch_22.json'));
        }
        if (!response.ok) {
            console.warn('Patch 22 config not found');
            return null;
        }
        patch22Config = await response.json();
        console.log('✓ Patch 22 config loaded');
        return patch22Config;
    } catch (error) {
        console.error('Failed to load Patch 22 config:', error);
        return null;
    }
}

async function loadPatch24Config() {
    try {
        const response = await fetch(encodeURI('/AFOQT-app/Test Content/patches/patch_24.json'));
        if (!response.ok) {
            console.warn('Patch 24 config not found');
            return null;
        }
        patch24Config = await response.json();
        console.log('✓ Patch 24 config loaded');
        return patch24Config;
    } catch (error) {
        console.error('Failed to load Patch 24 config:', error);
        return null;
    }
}

// Block Counting loader (no external config yet)
async function loadBlockCountingConfig() {
    try {
        const response = await fetch(encodeURI('/AFOQT-app/Test Content/Block Counting/patch_22_block_counting_ui_integration.json'));
        if (!response.ok) {
            console.warn('Block Counting config not found');
            return null;
        }
        patchBlockCountingConfig = await response.json();
        console.log('✓ Block Counting config loaded');
        return patchBlockCountingConfig;
    } catch (error) {
        console.error('Failed to load Block Counting config:', error);
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

function findSubjectForSubtopicPatch19(subtopicId) {
    if (!patch19Config) return null;
    for (const subject of patch19Config.subjects) {
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
        const response = await fetch(encodeURI(`./Test Content/Vocabulary/${filename}`));
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
        const response = await fetch(encodeURI(`./Test Content/Math/${filename}`));
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

async function loadArithmeticFile(filename) {
    try {
        const response = await fetch(encodeURI(`./Test Content/Arithmetic/${filename}`));
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

// Patch 20: Reading Comprehension loader
async function loadReadingComprehensionFile(filename) {
    try {
        // Folder name contains a space; encode it for fetch
        const url = encodeURI(`./Test Content/Reading Comprehension /${filename}`);
        const response = await fetch(url);
        if (!response.ok) {
            return null;
        }
        return await response.json();
    } catch (error) {
        console.warn('Failed to load reading comprehension file', filename, error);
        return null;
    }
}

// Physical Science loader
async function loadPhysicalScienceFile(filename) {
    try {
        const response = await fetch(encodeURI(`./Test Content/Physical Science/${filename}`));
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

// Patch 21: Instrument Comprehension loader
async function loadInstrumentComprehensionFile(filename) {
    try {
        const url = encodeURI(`./Test Content/Instrument Comprehension/${filename}`);
        const response = await fetch(url);
        if (!response.ok) {
            return null;
        }
        return await response.json();
    } catch (error) {
        console.warn('Failed to load instrument comprehension file', filename, error);
        return null;
    }
}

async function loadTableReadingFile(filename) {
    try {
        const url = encodeURI(`./Test Content/Table Reading/${filename}`);
        const response = await fetch(url);
        if (!response.ok) {
            return null;
        }
        return await response.json();
    } catch (error) {
        console.warn('Failed to load table reading file', filename, error);
        return null;
    }
}

async function loadBlockCountingFile(filename) {
    try {
        const url = encodeURI(`./Test Content/Block Counting/${filename}`);
        const response = await fetch(url);
        if (!response.ok) {
            return null;
        }
        return await response.json();
    } catch (error) {
        console.warn('Failed to load block counting file', filename, error);
        return null;
    }
}

async function loadAviationFile(filename) {
    try {
        const url = encodeURI(`./Test Content/Aviation/${filename}`);
        const response = await fetch(url);
        if (!response.ok) {
            return null;
        }
        return await response.json();
    } catch (error) {
        console.warn('Failed to load aviation file', filename, error);
        return null;
    }
}

async function loadSituationalFile(filename) {
    try {
        const url = encodeURI(`./Test Content/Situational/${filename}`);
        const response = await fetch(url);
        if (!response.ok) {
            return null;
        }
        return await response.json();
    } catch (error) {
        console.warn('Failed to load situational file', filename, error);
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
 * Load all arithmetic reasoning files (Patch 19) and build question registry
 */
async function loadAllArithmeticContent() {
    if (!patch19Config) {
        console.warn('Patch 19 config not loaded; skipping arithmetic content');
        return questionRegistry;
    }
    console.log('Loading arithmetic reasoning content...');

    // Use explicit file list based on current repo contents (beginner/advanced/expert)
    // Generated from Test Content/Arithmetic/*_part*.json to avoid missing topics on GitHub Pages
    const files = [
        'arithmetic_algebra_word_problems_advanced_part1.json',
        'arithmetic_algebra_word_problems_beginner_part1.json',
        'arithmetic_algebra_word_problems_beginner_part2.json',
        'arithmetic_algebra_word_problems_expert_part1.json',
        'arithmetic_average_word_problems_advanced_part1.json',
        'arithmetic_average_word_problems_beginner_part1.json',
        'arithmetic_average_word_problems_beginner_part2.json',
        'arithmetic_average_word_problems_expert_part1.json',
        'arithmetic_basic_arithmetic_advanced_part1.json',
        'arithmetic_basic_arithmetic_beginner_part1.json',
        'arithmetic_basic_arithmetic_beginner_part2.json',
        'arithmetic_basic_arithmetic_expert_part1.json',
        'arithmetic_basic_word_problems_advanced_part1.json',
        'arithmetic_basic_word_problems_beginner_part1.json',
        'arithmetic_basic_word_problems_beginner_part2.json',
        'arithmetic_basic_word_problems_expert_part1.json',
        'arithmetic_fractions_decimals_advanced_part1.json',
        'arithmetic_fractions_decimals_beginner_part1.json',
        'arithmetic_fractions_decimals_beginner_part2.json',
        'arithmetic_fractions_decimals_expert_part1.json',
        'arithmetic_percent_problems_advanced_part1.json',
        'arithmetic_percent_problems_beginner_part1.json',
        'arithmetic_percent_problems_beginner_part2.json',
        'arithmetic_percent_problems_expert_part1.json',
        'arithmetic_ratio_proportion_advanced_part1.json',
        'arithmetic_ratio_proportion_beginner_part1.json',
        'arithmetic_ratio_proportion_beginner_part2.json',
        'arithmetic_ratio_proportion_expert_part1.json',
        'arithmetic_time_rates_work_advanced_part1.json',
        'arithmetic_time_rates_work_beginner_part1.json',
        'arithmetic_time_rates_work_beginner_part2.json',
        'arithmetic_time_rates_work_expert_part1.json'
    ];

    let loadedCount = 0;
    let errorCount = 0;
    const loadPromises = files.map(async (filename) => {
        const data = await loadArithmeticFile(filename);
        if (!data || !data.questions) {
            return; // not all generated files exist; skip silently
        }
        const parsed = parseFilename(filename);
        if (!parsed) return;

        const subjectId = 'arithmetic_reasoning';
        const subtopicId = parsed.subtopicId.replace(/^arithmetic_/, ''); // normalize
        const difficulty = parsed.difficulty || 'beginner';

        if (!questionRegistry[subjectId]) questionRegistry[subjectId] = {};
        if (!questionRegistry[subjectId][subtopicId]) {
            questionRegistry[subjectId][subtopicId] = { beginner: [], advanced: [], expert: [] };
        }
        if (!questionRegistry[subjectId][subtopicId][difficulty]) {
            questionRegistry[subjectId][subtopicId][difficulty] = [];
        }

        questionRegistry[subjectId][subtopicId][difficulty].push(...data.questions);
        loadedCount++;
    });

    await Promise.all(loadPromises);
    console.log(`✓ Loaded ${loadedCount} arithmetic files (${errorCount} errors)`);
    console.log('Arithmetic question registry:', questionRegistry.arithmetic_reasoning);
    return questionRegistry;
}

/**
 * Load all Reading Comprehension files (Patch 20) and build question registry
 */
async function loadAllReadingComprehensionContent() {
    if (!patch20Config) {
        console.warn('Patch 20 config not loaded; skipping reading comprehension content');
        return questionRegistry;
    }
    console.log('Loading reading comprehension content...');

    const difficulties = ['beginner', 'advanced', 'expert'];
    const maxPassages = 20; // actual max passages per difficulty in repo
    const files = [];
    for (const d of difficulties) {
        for (let idx = 1; idx <= maxPassages; idx++) {
            files.push(`reading_comprehension_${d}_passage${idx}.json`);
        }
    }

    let loadedCount = 0;
    let errorCount = 0;
    const loadPromises = files.map(async (filename) => {
        const data = await loadReadingComprehensionFile(filename);
        if (!data || !data.questions || !data.passage) {
            return; // skip missing files silently
        }

        // Registry setup
        if (!questionRegistry['reading_comprehension']) {
            questionRegistry['reading_comprehension'] = {};
        }
        if (!questionRegistry['reading_comprehension']['rc_passage_comprehension']) {
            questionRegistry['reading_comprehension']['rc_passage_comprehension'] = {
                beginner: [],
                advanced: [],
                expert: []
            };
        }

        const difficulty = data.difficulty || 'beginner';
        if (!questionRegistry['reading_comprehension']['rc_passage_comprehension'][difficulty]) {
            questionRegistry['reading_comprehension']['rc_passage_comprehension'][difficulty] = [];
        }

        // Attach passage UI spec to each question so it renders with the passage
        const questionsWithPassage = data.questions.map(q => ({
            ...q,
            passageId: data.passageId,
            uiSpec: {
                type: 'rc_passage_block',
                passage: data.passage
            }
        }));

        questionRegistry['reading_comprehension']['rc_passage_comprehension'][difficulty].push(...questionsWithPassage);
        loadedCount++;
    });

    await Promise.all(loadPromises);
    console.log(`✓ Loaded ${loadedCount} reading comprehension passage files (${errorCount} errors)`);
    console.log('Reading question registry:', questionRegistry.reading_comprehension);
    return questionRegistry;
}

/**
 * Load all Instrument Comprehension files (Patch 21) and build question registry
 */
async function loadAllInstrumentComprehensionContent() {
    if (!patch21Config) {
        console.warn('Patch 21 config not loaded; skipping instrument comprehension content');
        return questionRegistry;
    }
    console.log('Loading instrument comprehension content...');

    const difficulties = ['beginner', 'advanced', 'expert'];
    const maxParts = 1; // only part1 exists per difficulty
    const files = [];
    for (const d of difficulties) {
        for (let part = 1; part <= maxParts; part++) {
            files.push(`instrument_comprehension_${d}_part${part}.json`);
        }
    }

    let loadedCount = 0;
    const loadPromises = files.map(async (filename) => {
        const data = await loadInstrumentComprehensionFile(filename);
        if (!data || !data.questions) {
            return; // skip missing files silently
        }

        // Registry setup
        if (!questionRegistry['instrument_comprehension']) {
            questionRegistry['instrument_comprehension'] = {};
        }
        if (!questionRegistry['instrument_comprehension']['basic_attitude_and_heading']) {
            questionRegistry['instrument_comprehension']['basic_attitude_and_heading'] = {
                beginner: [],
                advanced: [],
                expert: []
            };
        }

        const difficulty = data.difficulty || 'beginner';
        if (!questionRegistry['instrument_comprehension']['basic_attitude_and_heading'][difficulty]) {
            questionRegistry['instrument_comprehension']['basic_attitude_and_heading'][difficulty] = [];
        }

        questionRegistry['instrument_comprehension']['basic_attitude_and_heading'][difficulty].push(...data.questions);
        loadedCount++;
    });

    await Promise.all(loadPromises);
    console.log(`✓ Loaded ${loadedCount} instrument comprehension files`);
    console.log('IC question registry:', questionRegistry.instrument_comprehension);
    return questionRegistry;
}

async function loadAllTableReadingContent() {
    if (!patch22Config) {
        console.warn('Patch 22 config not loaded; skipping table reading content');
        return questionRegistry;
    }
    console.log('Loading table reading content...');

    const difficulties = ['beginner', 'advanced', 'expert'];
    const maxParts = 2; // part1 and part2 exist
    const files = [];
    for (const d of difficulties) {
        for (let part = 1; part <= maxParts; part++) {
            files.push(`table_reading_${d}_part${part}.json`);
        }
    }

    let loadedCount = 0;
    const loadPromises = files.map(async (filename) => {
        const data = await loadTableReadingFile(filename);
        if (!data || !data.questions) {
            return;
        }

        if (!questionRegistry['table_reading']) {
            questionRegistry['table_reading'] = {};
        }
        if (!questionRegistry['table_reading']['basic_lookup']) {
            questionRegistry['table_reading']['basic_lookup'] = {
                beginner: [],
                advanced: [],
                expert: []
            };
        }

        const difficulty = data.difficulty || 'beginner';
        if (!questionRegistry['table_reading']['basic_lookup'][difficulty]) {
            questionRegistry['table_reading']['basic_lookup'][difficulty] = [];
        }

        questionRegistry['table_reading']['basic_lookup'][difficulty].push(...data.questions);
        loadedCount++;
    });

    await Promise.all(loadPromises);
    console.log(`✓ Loaded ${loadedCount} table reading files`);
    console.log('Table Reading question registry:', questionRegistry.table_reading);
    return questionRegistry;
}

/**
 * Load all Physical Science files and build question registry
 */
async function loadAllPhysicalScienceContent() {
    console.log('Loading physical science content...');

    const physicalScienceFiles = [
        'physical_science_chemistry_basics_advanced_part1.json',
        'physical_science_chemistry_basics_advanced_part2.json',
        'physical_science_chemistry_basics_beginner_part1.json',
        'physical_science_chemistry_basics_beginner_part2.json',
        'physical_science_chemistry_basics_expert_part1.json',
        'physical_science_earth_space_advanced_part1.json',
        'physical_science_earth_space_advanced_part2.json',
        'physical_science_earth_space_beginner_part1.json',
        'physical_science_earth_space_beginner_part2.json',
        'physical_science_earth_space_expert_part1.json',
        'physical_science_electricity_magnetism_advanced_part1.json',
        'physical_science_electricity_magnetism_advanced_part2.json',
        'physical_science_electricity_magnetism_beginner_part1.json',
        'physical_science_electricity_magnetism_beginner_part2.json',
        'physical_science_electricity_magnetism_expert_part1.json',
        'physical_science_energy_heat_advanced_part1.json',
        'physical_science_energy_heat_advanced_part2.json',
        'physical_science_energy_heat_beginner_part1.json',
        'physical_science_energy_heat_beginner_part2.json',
        'physical_science_energy_heat_expert_part1.json',
        'physical_science_fluids_pressure_advanced_part1.json',
        'physical_science_fluids_pressure_advanced_part2.json',
        'physical_science_fluids_pressure_beginner_part1.json',
        'physical_science_fluids_pressure_beginner_part2.json',
        'physical_science_fluids_pressure_expert_part1.json',
        'physical_science_motion_mechanics_advanced_part1.json',
        'physical_science_motion_mechanics_advanced_part2.json',
        'physical_science_motion_mechanics_beginner_part1.json',
        'physical_science_motion_mechanics_beginner_part2.json',
        'physical_science_motion_mechanics_expert_part1.json',
        'physical_science_optics_waves_advanced_part1.json',
        'physical_science_optics_waves_advanced_part2.json',
        'physical_science_optics_waves_beginner_part1.json',
        'physical_science_optics_waves_beginner_part2.json',
        'physical_science_optics_waves_expert_part1.json'
    ];

    let loadedCount = 0;
    let errorCount = 0;

    const loadPromises = physicalScienceFiles.map(async (filename) => {
        const data = await loadPhysicalScienceFile(filename);
        if (!data || !data.questions) {
            errorCount++;
            return;
        }

        // Parse filename to extract subtopicId and difficulty
        const parsed = parseFilename(filename);
        if (!parsed) {
            errorCount++;
            return;
        }

        // Initialize registry structure
        if (!questionRegistry['physical_science']) {
            questionRegistry['physical_science'] = {};
        }
        if (!questionRegistry['physical_science'][parsed.subtopicId]) {
            questionRegistry['physical_science'][parsed.subtopicId] = {
                beginner: [],
                advanced: [],
                expert: []
            };
        }

        const difficulty = data.difficulty || parsed.difficulty || 'beginner';
        if (!questionRegistry['physical_science'][parsed.subtopicId][difficulty]) {
            questionRegistry['physical_science'][parsed.subtopicId][difficulty] = [];
        }

        questionRegistry['physical_science'][parsed.subtopicId][difficulty].push(...data.questions);
        loadedCount++;
    });

    await Promise.all(loadPromises);
    console.log(`✓ Loaded ${loadedCount} physical science files (${errorCount} errors)`);
    console.log('Physical Science question registry:', questionRegistry.physical_science);
    return questionRegistry;
}

async function loadAllBlockCountingContent() {
    // Block Counting content does not yet rely on a config file; load whatever exists
    console.log('Loading block counting content...');

    const difficulties = ['beginner', 'advanced', 'expert'];
    const maxParts = 2; // part1 and part2 exist
    const files = [];
    for (const d of difficulties) {
        for (let part = 1; part <= maxParts; part++) {
            files.push(`block_counting_${d}_part${part}.json`);
        }
    }

    let loadedCount = 0;
    const loadPromises = files.map(async (filename) => {
        const data = await loadBlockCountingFile(filename);
        if (!data || !data.questions) {
            return; // skip missing files silently
        }

        const subjectId = data.subjectId || 'block_counting';
        const subtopicId = data.subtopicId || 'stacked_cubes';
        const difficulty = data.difficulty || 'beginner';

        if (!questionRegistry[subjectId]) {
            questionRegistry[subjectId] = {};
        }
        if (!questionRegistry[subjectId][subtopicId]) {
            questionRegistry[subjectId][subtopicId] = { beginner: [], advanced: [], expert: [] };
        }
        if (!questionRegistry[subjectId][subtopicId][difficulty]) {
            questionRegistry[subjectId][subtopicId][difficulty] = [];
        }

        questionRegistry[subjectId][subtopicId][difficulty].push(...data.questions);
        loadedCount++;
    });

    await Promise.all(loadPromises);
    console.log(`✓ Loaded ${loadedCount} block counting files`);
    console.log('Block Counting question registry:', questionRegistry.block_counting);
    return questionRegistry;
}

async function loadAllAviationContent() {
    console.log('Loading aviation content...');

    const aviationFiles = [
        'aviation_information_beginner.json',
        'aviation_information_advanced.json',
        'aviation_information_advanced_part1.json',
        'aviation_information_expert.json',
        'aviation_information_expert_part1.json'
    ];

    let loadedCount = 0;
    const loadPromises = aviationFiles.map(async (filename) => {
        const data = await loadAviationFile(filename);
        if (!data || !data.questions) {
            return; // skip missing files silently
        }

        const subjectId = data.subjectId || 'aviation_information';
        const subtopicId = data.subtopicId || 'aviation_basics';
        const difficulty = data.difficulty || 'beginner';

        if (!questionRegistry[subjectId]) {
            questionRegistry[subjectId] = {};
        }
        if (!questionRegistry[subjectId][subtopicId]) {
            questionRegistry[subjectId][subtopicId] = { beginner: [], advanced: [], expert: [] };
        }
        if (!questionRegistry[subjectId][subtopicId][difficulty]) {
            questionRegistry[subjectId][subtopicId][difficulty] = [];
        }

        questionRegistry[subjectId][subtopicId][difficulty].push(...data.questions);
        loadedCount++;
    });

    await Promise.all(loadPromises);
    console.log(`✓ Loaded ${loadedCount} aviation files`);
    console.log('Aviation question registry:', questionRegistry.aviation_information);
    return questionRegistry;
}

async function loadAllSituationalContent() {
    console.log('Loading situational judgment content...');

    const situationalFiles = [
        'situational_judgment_beginner.json',
        'situational_judgment_advanced.json',
        'situational_judgment_advanced_part1.json',
        'situational_judgment_expert.json',
        'situational_judgment_expert_part1.json'
    ];

    let loadedCount = 0;
    const loadPromises = situationalFiles.map(async (filename) => {
        const data = await loadSituationalFile(filename);
        if (!data) {
            return; // skip missing files silently
        }

        const subjectId = data.subjectId || 'situational_judgment';
        const subtopicId = data.subtopicId || 'judgment_scenarios';
        const difficulty = data.difficulty || 'beginner';

        // Handle scenarios array instead of questions array
        const items = data.scenarios || data.questions || [];
        if (items.length === 0) {
            return;
        }

        if (!questionRegistry[subjectId]) {
            questionRegistry[subjectId] = {};
        }
        if (!questionRegistry[subjectId][subtopicId]) {
            questionRegistry[subjectId][subtopicId] = { beginner: [], advanced: [], expert: [] };
        }
        if (!questionRegistry[subjectId][subtopicId][difficulty]) {
            questionRegistry[subjectId][subtopicId][difficulty] = [];
        }

        questionRegistry[subjectId][subtopicId][difficulty].push(...items);
        loadedCount++;
    });

    await Promise.all(loadPromises);
    console.log(`✓ Loaded ${loadedCount} situational judgment files`);
    console.log('Situational Judgment question registry:', questionRegistry.situational_judgment);
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

    // Preserve table reading structures
    if (jsonQuestion.tableSpec) {
        converted.tableSpec = jsonQuestion.tableSpec;
    }
    if (jsonQuestion.lookup !== undefined) {
        converted.lookup = jsonQuestion.lookup;
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
    if (!patch18Config && !patch19Config && !patch20Config && !patch21Config) {
        return [];
    }
    
    const practiceTests = [];
    
    if (patch18Config && patch18Config.afoqtPracticeTests) {
        for (const testConfig of patch18Config.afoqtPracticeTests.subjectConfigs) {
            practiceTests.push(createPracticeTestTopic(testConfig));
        }
    }
    
    // Add Patch 19 (Arithmetic) practice tests if available
    if (patch19Config && patch19Config.afoqtPracticeTests) {
        for (const testConfig of patch19Config.afoqtPracticeTests.subjectConfigs) {
            // Normalize arithmetic subtopic IDs to match loaded registry keys (strip suffixes and prefixes)
            const normalizedSubtopics = (testConfig.questionSelectionPolicy.subtopicsIncluded || []).map(id =>
                id.replace(/_word_problems$/, '').replace(/^arithmetic_/, '')
            );
            practiceTests.push(createPracticeTestTopic({
                ...testConfig,
                questionSelectionPolicy: {
                    ...testConfig.questionSelectionPolicy,
                    subtopicsIncluded: normalizedSubtopics
                }
            }));
        }
    }

    // Add Patch 20 (Reading Comprehension) practice test using rules
    if (patch20Config && patch20Config.subjectsIncluded && patch20Config.subjectsIncluded.includes('reading_comprehension')) {
        const rules = patch20Config.rules || {};
        const difficultyDistribution = rules.difficultyMix || { beginner: 0.4, advanced: 0.4, expert: 0.2 };
        practiceTests.push(createPracticeTestTopic({
            practiceTestId: 'afoqt_reading_comprehension_practice_test',
            displayName: 'AFOQT Reading Comprehension Practice Test',
            subjectId: 'reading_comprehension',
            questionSelectionPolicy: {
                subtopicsIncluded: ['rc_passage_comprehension'],
                difficultyDistribution,
                defaultTestLength: rules.defaultTestLength || 20
            },
            mode: 'practiceTestMode'
        }));
    }

    // Add Patch 21 (Instrument Comprehension) practice test using rules
    if (patch21Config && patch21Config.subjectsIncluded && patch21Config.subjectsIncluded.includes('instrument_comprehension')) {
        const rules = patch21Config.rules || {};
        const difficultyDistribution = rules.difficultyMix || { beginner: 0.35, advanced: 0.45, expert: 0.2 };
        practiceTests.push(createPracticeTestTopic({
            practiceTestId: 'afoqt_instrument_comprehension_practice_test',
            displayName: 'AFOQT Instrument Comprehension Practice Test',
            subjectId: 'instrument_comprehension',
            questionSelectionPolicy: {
                subtopicsIncluded: ['basic_attitude_and_heading'],
                difficultyDistribution,
                defaultTestLength: rules.defaultTestLength || 25
            },
            mode: 'practiceTestMode'
        }));
    }

    // Add Patch 22 (Table Reading) practice test using rules
    if (patch22Config && patch22Config.area && patch22Config.area.includes('TableReading')) {
        const difficultyDistribution = { beginner: 0.4, advanced: 0.4, expert: 0.2 };
        practiceTests.push(createPracticeTestTopic({
            practiceTestId: 'afoqt_table_reading_practice_test',
            displayName: 'AFOQT Table Reading Practice Test',
            subjectId: 'table_reading',
            questionSelectionPolicy: {
                subtopicsIncluded: ['basic_lookup'],
                difficultyDistribution,
                defaultTestLength: 40
            },
            mode: 'practiceTestMode'
        }));
    }
    
    return practiceTests;
}

/**
 * Helper function to create a single practice test topic
 */
function createPracticeTestTopic(testConfig) {
    return {
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
    };
}

/**
 * Initialize Patch 18 system
 */
async function initializePatch18() {
    console.log('🔧 [INIT] Starting Patch 18 initialization...');
    
    try {
        // Load config
        console.log('[INIT] Loading Patch 18 config...');
        await loadPatch18Config();
        if (!patch18Config) {
            console.warn('[INIT] Patch 18 config not available - will use fallback procedural generation');
            return false;
        }
        console.log('[INIT] Patch 18 config loaded');
        
        // Load vocabulary content
        console.log('[INIT] Loading vocabulary content...');
        await loadAllVocabularyContent();
        
        // Load math knowledge content
        console.log('[INIT] Loading math knowledge content...');
        await loadAllMathKnowledgeContent();

        // Load Patch 19 and arithmetic content
        console.log('[INIT] Loading Patch 19 (Arithmetic)...');
        await loadPatch19Config();
        if (patch19Config) {
            await loadAllArithmeticContent();
        }

        // Load Patch 20 and reading comprehension content
        console.log('[INIT] Loading Patch 20 (Reading Comprehension)...');
        await loadPatch20Config();
        if (patch20Config) {
            await loadAllReadingComprehensionContent();
        }

        // Load Patch 21 and instrument comprehension content
        console.log('[INIT] Loading Patch 21 (Instrument Comprehension)...');
        await loadPatch21Config();
        if (patch21Config) {
            await loadAllInstrumentComprehensionContent();
        }

        // Load Patch 22 and table reading content
        console.log('[INIT] Loading Patch 22 (Table Reading)...');
        await loadPatch22Config();
        if (patch22Config) {
            await loadAllTableReadingContent();
        }

        // Load Patch 24 (scoped Table Reading renderer)
        console.log('[INIT] Loading Patch 24 (UI renderer)...');
        await loadPatch24Config();
        if (!patch24Config) {
            console.log('[INIT] Patch 24 not loaded - will use legacy table renderer');
        }

        // Load Block Counting config (optional) and content
        console.log('[INIT] Loading Block Counting content...');
        await loadBlockCountingConfig();
        await loadAllBlockCountingContent();
        
        // Load Physical Science content
        console.log('[INIT] Loading Physical Science content...');
        await loadAllPhysicalScienceContent();
        
        // Load Aviation content
        console.log('[INIT] Loading Aviation content...');
        await loadAllAviationContent();
        
        // Load Situational Judgment content
        console.log('[INIT] Loading Situational Judgment content...');
        await loadAllSituationalContent();
        
        console.log('✓✓✓ [INIT] Patch 18 initialized successfully');
        return true;
    } catch (error) {
        console.error('[INIT] ERROR during initialization:', error);
        throw error; // Re-throw so caller can handle
    }
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializePatch18,
        createAfoqtPracticeTestTopics,
        getQuestionsFromRegistry,
        generateAfoqtPracticeTest,
        loadPatch20Config,
        loadAllReadingComprehensionContent,
        loadPatch21Config,
        loadAllInstrumentComprehensionContent,
        loadPatch22Config,
        loadAllTableReadingContent,
        loadBlockCountingConfig,
        loadAllBlockCountingContent,
        loadAllAviationContent,
        loadAllSituationalContent,
        questionRegistry
    };
}

// Attach to window for test pages and non-module environments
if (typeof window !== 'undefined') {
    window.initializePatch18 = initializePatch18;
    window.createAfoqtPracticeTestTopics = createAfoqtPracticeTestTopics;
    window.getQuestionsFromRegistry = getQuestionsFromRegistry;
    window.generateAfoqtPracticeTest = generateAfoqtPracticeTest;
    window.loadPatch20Config = loadPatch20Config;
    window.loadAllReadingComprehensionContent = loadAllReadingComprehensionContent;
    window.loadPatch21Config = loadPatch21Config;
    window.loadAllInstrumentComprehensionContent = loadAllInstrumentComprehensionContent;
    window.loadPatch22Config = loadPatch22Config;
    window.loadAllTableReadingContent = loadAllTableReadingContent;
    window.loadBlockCountingConfig = loadBlockCountingConfig;
    window.loadAllBlockCountingContent = loadAllBlockCountingContent;
    window.loadAllAviationContent = loadAllAviationContent;
    window.loadAllSituationalContent = loadAllSituationalContent;
    window.questionRegistry = questionRegistry;
    window.getQuestionsWithSpacedRepetition = getQuestionsWithSpacedRepetition;
}
