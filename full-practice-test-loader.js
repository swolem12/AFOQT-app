/**
 * AFOQT Full Practice Test Loader
 * Loads and manages questions for full-length AFOQT practice exams
 * Maps question files to exam sections defined in full_afoqt_practice_test_config_v1.json
 */

// Full practice test configuration and question registry
const fullPracticeTestConfig = {
    config: null, // Will hold the loaded config from JSON
    questionRegistry: {}, // {sectionId: {beginner: [], advanced: [], expert: []}}
    initialized: false
};

/**
 * Initialize the full practice test system
 * Loads config and builds question registry from Test Content files
 */
async function initializeFullPracticeTest() {
    if (fullPracticeTestConfig.initialized) {
        console.log('[Full Practice Test] Already initialized');
        return true;
    }

    try {
        console.log('[Full Practice Test] Initializing...');

        // Load configuration file
        const configResponse = await fetch('Test Content/full_afoqt_practice_test_config_v1.json');
        if (!configResponse.ok) {
            throw new Error(`Failed to load config: ${configResponse.status}`);
        }
        fullPracticeTestConfig.config = await configResponse.json();
        console.log('[Full Practice Test] Config loaded:', fullPracticeTestConfig.config);

        // Build question registry for each section
        await buildQuestionRegistry();

        fullPracticeTestConfig.initialized = true;
        console.log('[Full Practice Test] Initialization complete');
        return true;

    } catch (error) {
        console.error('[Full Practice Test] Initialization failed:', error);
        return false;
    }
}

/**
 * Build question registry by loading all question files for each exam section
 */
async function buildQuestionRegistry() {
    const sections = fullPracticeTestConfig.config.examSections;
    
    for (const section of sections) {
        console.log(`[Full Practice Test] Loading questions for section: ${section.sectionId}`);
        
        fullPracticeTestConfig.questionRegistry[section.sectionId] = {
            beginner: [],
            advanced: [],
            expert: []
        };

        // Load questions based on section type
        await loadSectionQuestions(section);
    }

    console.log('[Full Practice Test] Question registry built:', fullPracticeTestConfig.questionRegistry);
}

/**
 * Load questions for a specific exam section
 */
async function loadSectionQuestions(section) {
    const sourceId = section.sourceSubjectId;
    const registry = fullPracticeTestConfig.questionRegistry[section.sectionId];

    // Map section IDs to Test Content folder names and file patterns
    const sectionMappings = {
        'verbal_analogies': {
            folder: 'Vocabulary',
            pattern: 'verbal_analogies_{difficulty}_part{part}.json',
            parts: [1, 2]
        },
        'arithmetic_reasoning': {
            folder: 'Arithmetic',
            pattern: 'arithmetic_reasoning_{difficulty}_part{part}.json',
            parts: [1, 2]
        },
        'word_knowledge': {
            folder: 'Vocabulary',
            patterns: [
                'synonyms_{difficulty}_part{part}.json',
                'antonyms_{difficulty}_part{part}.json'
            ],
            parts: [1, 2]
        },
        'math_knowledge': {
            folder: 'Math',
            // Math has many subtopics - load all beginner/advanced/expert part files
            pattern: '*_{difficulty}_part{part}.json',
            parts: [1, 2],
            subtopics: [
                'order_of_operations', 'number_sets', 'fractions', 'decimals',
                'ratio_and_proportion', 'percent_problems', 'exponents_and_roots',
                'algebra_basics', 'evaluating_expressions', 'solving_linear_equations',
                'functions', 'function_evaluation', 'slope', 'graphing_linear_functions',
                'coordinate_geometry', 'polygons_and_angles', 'circles',
                'transformations', 'sequences', 'probability', 'statistics'
            ]
        },
        'reading_comprehension': {
            folder: 'Reading Comprehension ',
            pattern: 'reading_comprehension_{difficulty}.json'
        },
        'situational_judgment': {
            folder: 'Situational',
            pattern: 'situational_judgment_{difficulty}_part{part}.json',
            parts: [1, 2]
        },
        'self_description_inventory': {
            folder: 'Situational',
            // SDI not scored - skip or use placeholder
            skip: true
        },
        'physical_science': {
            folder: 'Physical Science',
            pattern: 'physical_science_*_{difficulty}_part{part}.json',
            parts: [1, 2, 3],
            subtopics: [
                'motion_mechanics', 'forces_motion', 'energy_heat',
                'electricity_magnetism', 'optics_waves', 'chemistry_basics',
                'earth_space', 'fluids_pressure'
            ]
        },
        'table_reading': {
            folder: 'Table Reading',
            pattern: 'table_reading_{difficulty}_part{part}.json',
            parts: [1, 2, 3]
        },
        'instrument_comprehension': {
            folder: 'Instrument Comprehension',
            pattern: 'instrument_comprehension_{difficulty}_part{part}.json',
            parts: [1, 2]
        },
        'block_counting': {
            folder: 'Block Counting',
            pattern: 'block_counting_{difficulty}_part{part}.json',
            parts: [1, 2]
        },
        'aviation_information': {
            folder: 'Aviation',
            pattern: 'aviation_information_{difficulty}_part{part}.json',
            parts: [1, 2, 3]
        }
    };

    const mapping = sectionMappings[section.sectionId];
    if (!mapping || mapping.skip) {
        console.log(`[Full Practice Test] Skipping section: ${section.sectionId}`);
        return;
    }

    // Load questions for each difficulty level
    for (const difficulty of ['beginner', 'advanced', 'expert']) {
        await loadQuestionsForDifficulty(section.sectionId, mapping, difficulty, registry);
    }
}

/**
 * Load questions for a specific difficulty level
 */
async function loadQuestionsForDifficulty(sectionId, mapping, difficulty, registry) {
    const questions = [];

    try {
        // Handle different file patterns
        if (mapping.subtopics) {
            // Load multiple subtopic files (Math, Physical Science)
            for (const subtopic of mapping.subtopics) {
                for (const part of mapping.parts || [1]) {
                    const filename = `${subtopic}_${difficulty}_part${part}.json`;
                    const filepath = `Test Content/${mapping.folder}/${filename}`;
                    const loaded = await loadQuestionFile(filepath);
                    if (loaded && loaded.questions) {
                        questions.push(...loaded.questions);
                    }
                }
            }
        } else if (mapping.patterns) {
            // Load multiple patterns (Word Knowledge: synonyms + antonyms)
            for (const pattern of mapping.patterns) {
                for (const part of mapping.parts || [1]) {
                    const filename = pattern.replace('{difficulty}', difficulty).replace('{part}', part);
                    const filepath = `Test Content/${mapping.folder}/${filename}`;
                    const loaded = await loadQuestionFile(filepath);
                    if (loaded && loaded.questions) {
                        questions.push(...loaded.questions);
                    }
                }
            }
        } else if (mapping.parts) {
            // Load multiple parts for single pattern
            for (const part of mapping.parts) {
                const filename = mapping.pattern.replace('{difficulty}', difficulty).replace('{part}', part);
                const filepath = `Test Content/${mapping.folder}/${filename}`;
                const loaded = await loadQuestionFile(filepath);
                if (loaded && loaded.questions) {
                    questions.push(...loaded.questions);
                }
            }
        } else {
            // Load single file
            const filename = mapping.pattern.replace('{difficulty}', difficulty);
            const filepath = `Test Content/${mapping.folder}/${filename}`;
            const loaded = await loadQuestionFile(filepath);
            if (loaded && loaded.questions) {
                questions.push(...loaded.questions);
            }
        }

        registry[difficulty] = questions;
        console.log(`[Full Practice Test] Loaded ${questions.length} ${difficulty} questions for ${sectionId}`);

    } catch (error) {
        console.error(`[Full Practice Test] Error loading ${difficulty} questions for ${sectionId}:`, error);
    }
}

/**
 * Load a single question file
 */
async function loadQuestionFile(filepath) {
    try {
        const response = await fetch(filepath);
        if (!response.ok) {
            // File doesn't exist - not an error, just skip
            return null;
        }
        return await response.json();
    } catch (error) {
        // Silently skip missing files
        return null;
    }
}

/**
 * Generate a full practice test for a specific difficulty
 * @param {string} difficulty - 'beginner', 'advanced', or 'expert'
 * @returns {object} Full test with all sections and questions
 */
function generateFullPracticeTest(difficulty) {
    if (!fullPracticeTestConfig.initialized) {
        console.error('[Full Practice Test] Not initialized!');
        return null;
    }

    const config = fullPracticeTestConfig.config;
    const testSections = [];

    for (const sectionConfig of config.examSections) {
        const sectionQuestions = selectQuestionsForSection(sectionConfig, difficulty);
        
        testSections.push({
            sectionId: sectionConfig.sectionId,
            displayName: sectionConfig.displayName,
            questionCount: sectionConfig.questionCount,
            timeLimitSeconds: sectionConfig.timeLimitSeconds,
            questions: sectionQuestions,
            currentQuestionIndex: 0,
            answers: new Array(sectionQuestions.length).fill(null),
            timeRemaining: sectionConfig.timeLimitSeconds,
            completed: false
        });
    }

    return {
        difficulty,
        sections: testSections,
        currentSectionIndex: 0,
        startTime: Date.now(),
        attemptNumber: getNextAttemptNumber()
    };
}

/**
 * Select questions for a specific section based on selection strategy
 */
function selectQuestionsForSection(sectionConfig, difficulty) {
    const registry = fullPracticeTestConfig.questionRegistry[sectionConfig.sectionId];
    if (!registry || !registry[difficulty]) {
        console.warn(`[Full Practice Test] No questions found for ${sectionConfig.sectionId} at ${difficulty}`);
        return [];
    }

    const availableQuestions = [...registry[difficulty]];
    const needed = sectionConfig.questionCount;

    // Handle special cases
    if (sectionConfig.sectionId === 'reading_comprehension') {
        return selectReadingComprehensionQuestions(availableQuestions, needed);
    }

    // Stratified random selection (default)
    return stratifiedRandomSelection(availableQuestions, needed);
}

/**
 * Stratified random selection - evenly distribute across available questions
 */
function stratifiedRandomSelection(questions, count) {
    if (questions.length <= count) {
        // Not enough questions, return all shuffled
        return shuffleArray([...questions]);
    }

    // Shuffle and take first N
    const shuffled = shuffleArray([...questions]);
    return shuffled.slice(0, count);
}

/**
 * Select reading comprehension questions by passage
 */
function selectReadingComprehensionQuestions(questions, count) {
    // Group questions by passage
    const passages = {};
    questions.forEach(q => {
        const passageId = q.passageId || q.passage || 'unknown';
        if (!passages[passageId]) {
            passages[passageId] = [];
        }
        passages[passageId].push(q);
    });

    // Calculate how many passages we need (assuming 5 questions per passage)
    const questionsPerPassage = 5;
    const passagesNeeded = Math.ceil(count / questionsPerPassage);

    // Randomly select passages
    const passageIds = Object.keys(passages);
    const selectedPassageIds = shuffleArray(passageIds).slice(0, passagesNeeded);

    // Collect all questions from selected passages
    const selectedQuestions = [];
    selectedPassageIds.forEach(id => {
        selectedQuestions.push(...passages[id]);
    });

    // Take exactly the count needed
    return selectedQuestions.slice(0, count);
}

/**
 * Get next attempt number for current player
 */
function getNextAttemptNumber() {
    if (!state.currentPlayer) return 1;
    
    const attempts = state.currentPlayer.fullPracticeTestAttempts || [];
    return attempts.length + 1;
}

/**
 * Save full practice test result
 */
function saveFullPracticeTestResult(testData) {
    if (!state.currentPlayer) {
        console.warn('[Full Practice Test] No current player to save result');
        return;
    }

    if (!state.currentPlayer.fullPracticeTestAttempts) {
        state.currentPlayer.fullPracticeTestAttempts = [];
    }

    // Calculate section scores
    const sectionScores = {};
    const blanksPerSection = {};
    
    testData.sections.forEach(section => {
        let correct = 0;
        let blanks = 0;
        
        section.questions.forEach((q, idx) => {
            const userAnswer = section.answers[idx];
            if (userAnswer === null || userAnswer === undefined) {
                blanks++;
            } else if (userAnswer === q.correctIndex || userAnswer === q.answer) {
                correct++;
            }
        });

        sectionScores[section.sectionId] = {
            score: correct,
            total: section.questions.length,
            percentage: Math.round((correct / section.questions.length) * 100),
            blanks: blanks
        };
        
        blanksPerSection[section.sectionId] = blanks;
    });

    // Calculate composite scores
    const composites = calculateCompositeScores(sectionScores);

    // Create result record
    const result = {
        attemptNumber: testData.attemptNumber,
        difficulty: testData.difficulty,
        timestamp: Date.now(),
        dateCompleted: new Date().toISOString(),
        sectionScores,
        blanksPerSection,
        compositeScore: composites.academicAptitude,
        composites,
        totalTime: Date.now() - testData.startTime
    };

    state.currentPlayer.fullPracticeTestAttempts.push(result);
    savePlayers();

    console.log('[Full Practice Test] Result saved:', result);
    return result;
}

/**
 * Calculate composite scores based on AFOQT formula
 */
function calculateCompositeScores(sectionScores) {
    const getPercent = (sectionId) => {
        return sectionScores[sectionId] ? sectionScores[sectionId].percentage : 0;
    };

    return {
        verbal: average([
            getPercent('verbal_analogies'),
            getPercent('word_knowledge'),
            getPercent('reading_comprehension')
        ]),
        quantitative: average([
            getPercent('arithmetic_reasoning'),
            getPercent('math_knowledge')
        ]),
        academicAptitude: average([
            getPercent('verbal_analogies'),
            getPercent('word_knowledge'),
            getPercent('arithmetic_reasoning'),
            getPercent('math_knowledge')
        ]),
        pilot: average([
            getPercent('instrument_comprehension'),
            getPercent('table_reading'),
            getPercent('aviation_information'),
            getPercent('math_knowledge')
        ]),
        cso: average([
            getPercent('verbal_analogies'),
            getPercent('arithmetic_reasoning'),
            getPercent('table_reading'),
            getPercent('math_knowledge'),
            getPercent('block_counting'),
            getPercent('physical_science')
        ]),
        abm: average([
            getPercent('verbal_analogies'),
            getPercent('word_knowledge'),
            getPercent('table_reading'),
            getPercent('instrument_comprehension'),
            getPercent('block_counting'),
            getPercent('aviation_information')
        ])
    };
}

/**
 * Calculate average of an array of numbers
 */
function average(numbers) {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((a, b) => a + b, 0);
    return Math.round(sum / numbers.length);
}

/**
 * Validate that all sections have questions loaded
 * Returns object with validation results for each section
 */
function validateFullPracticeTestContent() {
    const validation = {
        isValid: true,
        sections: {}
    };

    if (!fullPracticeTestConfig.initialized) {
        validation.isValid = false;
        validation.error = 'Not initialized';
        return validation;
    }

    const config = fullPracticeTestConfig.config;
    
    for (const section of config.examSections) {
        const registry = fullPracticeTestConfig.questionRegistry[section.sectionId];
        const sectionValidation = {
            sectionId: section.sectionId,
            displayName: section.displayName,
            requiredCount: section.questionCount,
            difficulties: {}
        };

        for (const difficulty of ['beginner', 'advanced', 'expert']) {
            const questions = registry && registry[difficulty] ? registry[difficulty] : [];
            const hasEnough = questions.length >= section.questionCount;
            
            sectionValidation.difficulties[difficulty] = {
                available: questions.length,
                required: section.questionCount,
                sufficient: hasEnough,
                status: hasEnough ? '✓' : '✗'
            };

            if (!hasEnough) {
                validation.isValid = false;
            }
        }

        validation.sections[section.sectionId] = sectionValidation;
    }

    return validation;
}
