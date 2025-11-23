// ============================================================================
// AFOQT Quest - IndexedDB Database Module
// Manages persistent storage for user profiles, sessions, and settings
// ============================================================================

const DB_NAME = 'afoqt-quest-db';
const DB_VERSION = 2;

// Object store names
const STORES = {
    PLAYERS: 'players',
    SESSIONS: 'sessions',
    SETTINGS: 'settings',
    QUESTION_HISTORY: 'questionHistory'
};

// Spaced repetition intervals (in days)
const SPACED_REPETITION = {
    INCORRECT: 0.5,      // 12 hours for incorrect answers
    CORRECT_FIRST: 1,    // 1 day after first correct answer
    CORRECT_SECOND: 3,   // 3 days after second correct answer
    CORRECT_MASTERY: 7   // 7 days for mastered questions (3+ correct)
};

class AfoqtDatabase {
    constructor() {
        this.db = null;
        this.initPromise = null;
    }

    /**
     * Initialize the database connection
     * @returns {Promise<IDBDatabase>}
     */
    async init() {
        if (this.db) {
            return this.db;
        }

        if (this.initPromise) {
            return this.initPromise;
        }

        this.initPromise = new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => {
                console.error('Database failed to open:', request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                console.log('Database opened successfully');
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                const oldVersion = event.oldVersion;
                console.log(`Upgrading database from version ${oldVersion} to ${DB_VERSION}...`);

                // Create Players object store
                if (!db.objectStoreNames.contains(STORES.PLAYERS)) {
                    const playersStore = db.createObjectStore(STORES.PLAYERS, { keyPath: 'id' });
                    playersStore.createIndex('name', 'name', { unique: false });
                    console.log('Created players object store');
                }

                // Create Sessions object store
                if (!db.objectStoreNames.contains(STORES.SESSIONS)) {
                    const sessionsStore = db.createObjectStore(STORES.SESSIONS, { 
                        keyPath: 'id', 
                        autoIncrement: true 
                    });
                    sessionsStore.createIndex('playerId', 'playerId', { unique: false });
                    sessionsStore.createIndex('topicId', 'topicId', { unique: false });
                    sessionsStore.createIndex('timestamp', 'timestamp', { unique: false });
                    sessionsStore.createIndex('playerIdTimestamp', ['playerId', 'timestamp'], { unique: false });
                    console.log('Created sessions object store');
                }

                // Create Settings object store
                if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
                    db.createObjectStore(STORES.SETTINGS, { keyPath: 'id' });
                    console.log('Created settings object store');
                }

                // Create Question History object store (v2)
                if (!db.objectStoreNames.contains(STORES.QUESTION_HISTORY)) {
                    const questionHistoryStore = db.createObjectStore(STORES.QUESTION_HISTORY, { 
                        keyPath: 'id', 
                        autoIncrement: true 
                    });
                    questionHistoryStore.createIndex('playerId', 'playerId', { unique: false });
                    questionHistoryStore.createIndex('questionId', 'questionId', { unique: false });
                    questionHistoryStore.createIndex('subtopicId', 'subtopicId', { unique: false });
                    questionHistoryStore.createIndex('playerIdQuestionId', ['playerId', 'questionId'], { unique: false });
                    questionHistoryStore.createIndex('playerIdSubtopic', ['playerId', 'subtopicId'], { unique: false });
                    questionHistoryStore.createIndex('nextReview', 'nextReview', { unique: false });
                    questionHistoryStore.createIndex('playerIdNextReview', ['playerId', 'nextReview'], { unique: false });
                    console.log('Created question history object store');
                }
            };
        });

        return this.initPromise;
    }

    // ============================================================================
    // Player Operations
    // ============================================================================

    /**
     * Get all players
     * @returns {Promise<Array>}
     */
    async getAllPlayers() {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORES.PLAYERS], 'readonly');
            const store = transaction.objectStore(STORES.PLAYERS);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Get a player by ID
     * @param {string} playerId
     * @returns {Promise<Object|null>}
     */
    async getPlayer(playerId) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORES.PLAYERS], 'readonly');
            const store = transaction.objectStore(STORES.PLAYERS);
            const request = store.get(playerId);

            request.onsuccess = () => resolve(request.result || null);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Save a player (create or update)
     * @param {Object} player
     * @returns {Promise<string>} playerId
     */
    async savePlayer(player) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORES.PLAYERS], 'readwrite');
            const store = transaction.objectStore(STORES.PLAYERS);
            const request = store.put(player);

            request.onsuccess = () => resolve(player.id);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Delete a player
     * @param {string} playerId
     * @returns {Promise<void>}
     */
    async deletePlayer(playerId) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORES.PLAYERS], 'readwrite');
            const store = transaction.objectStore(STORES.PLAYERS);
            const request = store.delete(playerId);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    // ============================================================================
    // Session Operations
    // ============================================================================

    /**
     * Save a session
     * @param {Object} session - must include playerId
     * @returns {Promise<number>} session id
     */
    async saveSession(session) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORES.SESSIONS], 'readwrite');
            const store = transaction.objectStore(STORES.SESSIONS);
            const request = store.add(session);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Get all sessions for a player
     * @param {string} playerId
     * @returns {Promise<Array>}
     */
    async getPlayerSessions(playerId) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORES.SESSIONS], 'readonly');
            const store = transaction.objectStore(STORES.SESSIONS);
            const index = store.index('playerId');
            const request = index.getAll(playerId);

            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Get recent sessions for a player
     * @param {string} playerId
     * @param {number} limit
     * @returns {Promise<Array>}
     */
    async getRecentPlayerSessions(playerId, limit = 10) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORES.SESSIONS], 'readonly');
            const store = transaction.objectStore(STORES.SESSIONS);
            const index = store.index('playerIdTimestamp');
            const range = IDBKeyRange.bound([playerId, 0], [playerId, Date.now()]);
            
            const sessions = [];
            const request = index.openCursor(range, 'prev'); // Reverse order (newest first)

            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor && sessions.length < limit) {
                    sessions.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(sessions);
                }
            };

            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Delete all sessions for a player
     * @param {string} playerId
     * @returns {Promise<void>}
     */
    async deletePlayerSessions(playerId) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORES.SESSIONS], 'readwrite');
            const store = transaction.objectStore(STORES.SESSIONS);
            const index = store.index('playerId');
            const request = index.openCursor(IDBKeyRange.only(playerId));

            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    cursor.delete();
                    cursor.continue();
                } else {
                    resolve();
                }
            };

            request.onerror = () => reject(request.error);
        });
    }

    // ============================================================================
    // Settings Operations
    // ============================================================================

    /**
     * Get settings
     * @param {string} settingsId - typically 'global'
     * @returns {Promise<Object|null>}
     */
    async getSettings(settingsId = 'global') {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORES.SETTINGS], 'readonly');
            const store = transaction.objectStore(STORES.SETTINGS);
            const request = store.get(settingsId);

            request.onsuccess = () => resolve(request.result || null);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Save settings
     * @param {Object} settings - must include id property
     * @returns {Promise<void>}
     */
    async saveSettings(settings) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORES.SETTINGS], 'readwrite');
            const store = transaction.objectStore(STORES.SETTINGS);
            const request = store.put(settings);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    // ============================================================================
    // Question History Operations (for spaced repetition)
    // ============================================================================

    /**
     * Record a question attempt with atomic attempt count calculation
     * @param {Object} questionRecord - must include playerId and questionId
     * @returns {Promise<number>} record id
     */
    async recordQuestionAttemptAtomic(questionRecord) {
        await this.init();
        
        return new Promise((resolve, reject) => {
            // Use a single transaction to read history and write new attempt atomically
            const transaction = this.db.transaction([STORES.QUESTION_HISTORY], 'readwrite');
            const store = transaction.objectStore(STORES.QUESTION_HISTORY);
            const index = store.index('playerIdQuestionId');
            
            // First, get the count of previous attempts
            const countRequest = index.count([questionRecord.playerId, questionRecord.questionId]);
            
            countRequest.onsuccess = () => {
                const attemptCount = countRequest.result + 1;
                
                // Calculate next review date based on performance (spaced repetition)
                const now = Date.now();
                let intervalDays = SPACED_REPETITION.CORRECT_FIRST;
                
                if (questionRecord.correct) {
                    // Correct answer: increase interval based on attempt count
                    if (attemptCount >= 3) {
                        intervalDays = SPACED_REPETITION.CORRECT_MASTERY;
                    } else if (attemptCount >= 2) {
                        intervalDays = SPACED_REPETITION.CORRECT_SECOND;
                    } else {
                        intervalDays = SPACED_REPETITION.CORRECT_FIRST;
                    }
                } else {
                    // Incorrect answer: review soon
                    intervalDays = SPACED_REPETITION.INCORRECT;
                }
                
                const nextReview = now + (intervalDays * 24 * 60 * 60 * 1000);
                
                const record = {
                    ...questionRecord,
                    attemptCount,
                    nextReview,
                    timestamp: now
                };
                
                // Now add the new attempt record
                const addRequest = store.add(record);
                addRequest.onsuccess = () => resolve(addRequest.result);
                addRequest.onerror = () => reject(addRequest.error);
            };
            
            countRequest.onerror = () => reject(countRequest.error);
            transaction.onerror = () => reject(transaction.error);
        });
    }

    /**
     * Record a question attempt
     * @param {Object} questionRecord
     * @returns {Promise<number>} record id
     */
    async recordQuestionAttempt(questionRecord) {
        await this.init();
        
        // Calculate next review date based on performance (spaced repetition)
        const now = Date.now();
        let intervalDays = SPACED_REPETITION.CORRECT_FIRST; // Default: review tomorrow
        
        if (questionRecord.correct) {
            // Correct answer: increase interval based on attempt count
            if (questionRecord.attemptCount >= 3) {
                intervalDays = SPACED_REPETITION.CORRECT_MASTERY;
            } else if (questionRecord.attemptCount >= 2) {
                intervalDays = SPACED_REPETITION.CORRECT_SECOND;
            } else {
                intervalDays = SPACED_REPETITION.CORRECT_FIRST;
            }
        } else {
            // Incorrect answer: review soon
            intervalDays = SPACED_REPETITION.INCORRECT;
        }
        
        const nextReview = now + (intervalDays * 24 * 60 * 60 * 1000);
        
        const record = {
            ...questionRecord,
            nextReview,
            timestamp: now
        };
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORES.QUESTION_HISTORY], 'readwrite');
            const store = transaction.objectStore(STORES.QUESTION_HISTORY);
            const request = store.add(record);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Get question history for a player and question
     * @param {string} playerId
     * @param {string} questionId
     * @returns {Promise<Array>}
     */
    async getQuestionHistory(playerId, questionId) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORES.QUESTION_HISTORY], 'readonly');
            const store = transaction.objectStore(STORES.QUESTION_HISTORY);
            const index = store.index('playerIdQuestionId');
            const request = index.getAll([playerId, questionId]);

            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Get questions due for review
     * @param {string} playerId
     * @param {number} limit
     * @returns {Promise<Array>} Array of most recent attempts for each question due for review
     */
    async getQuestionsDueForReview(playerId, limit = 20) {
        await this.init();
        const now = Date.now();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORES.QUESTION_HISTORY], 'readonly');
            const store = transaction.objectStore(STORES.QUESTION_HISTORY);
            const index = store.index('playerId');
            const request = index.getAll(playerId);

            request.onsuccess = () => {
                const allRecords = request.result || [];
                
                // Group by questionId and keep only the most recent attempt for each
                const latestByQuestion = new Map();
                allRecords.forEach(record => {
                    const existing = latestByQuestion.get(record.questionId);
                    if (!existing || record.timestamp > existing.timestamp) {
                        latestByQuestion.set(record.questionId, record);
                    }
                });
                
                // Filter for questions due for review (nextReview <= now)
                const dueQuestions = Array.from(latestByQuestion.values())
                    .filter(record => record.nextReview <= now)
                    .sort((a, b) => a.nextReview - b.nextReview) // Earlier due dates first
                    .slice(0, limit);
                
                resolve(dueQuestions);
            };

            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Get all question attempts for a subtopic
     * @param {string} playerId
     * @param {string} subtopicId
     * @returns {Promise<Array>}
     */
    async getSubtopicQuestionHistory(playerId, subtopicId) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORES.QUESTION_HISTORY], 'readonly');
            const store = transaction.objectStore(STORES.QUESTION_HISTORY);
            const index = store.index('playerIdSubtopic');
            const request = index.getAll([playerId, subtopicId]);

            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Get analytics data per subtopic for a player
     * @param {string} playerId
     * @returns {Promise<Object>} Subtopic analytics
     */
    async getSubtopicAnalytics(playerId) {
        await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORES.QUESTION_HISTORY], 'readonly');
            const store = transaction.objectStore(STORES.QUESTION_HISTORY);
            const index = store.index('playerId');
            const request = index.getAll(playerId);

            request.onsuccess = () => {
                const records = request.result || [];
                const analytics = {};
                
                records.forEach(record => {
                    const key = `${record.subtopicId}_${record.difficulty}`;
                    if (!analytics[key]) {
                        analytics[key] = {
                            subtopicId: record.subtopicId,
                            difficulty: record.difficulty,
                            totalAttempts: 0,
                            correctAttempts: 0,
                            totalTime: 0,
                            uniqueQuestions: new Set()
                        };
                    }
                    
                    analytics[key].totalAttempts++;
                    if (record.correct) {
                        analytics[key].correctAttempts++;
                    }
                    analytics[key].totalTime += (record.responseTime || 0);
                    analytics[key].uniqueQuestions.add(record.questionId);
                });
                
                // Convert sets to counts
                Object.keys(analytics).forEach(key => {
                    analytics[key].uniqueQuestionsCount = analytics[key].uniqueQuestions.size;
                    delete analytics[key].uniqueQuestions;
                    analytics[key].accuracy = analytics[key].totalAttempts > 0 ?
                        (analytics[key].correctAttempts / analytics[key].totalAttempts * 100).toFixed(1) : 0;
                    analytics[key].avgTime = analytics[key].totalAttempts > 0 ?
                        (analytics[key].totalTime / analytics[key].totalAttempts).toFixed(1) : 0;
                });
                
                resolve(analytics);
            };
            request.onerror = () => reject(request.error);
        });
    }

    // ============================================================================
    // Migration and Utility Operations
    // ============================================================================

    /**
     * Migrate data from localStorage to IndexedDB
     * @returns {Promise<Object>} Migration results
     */
    async migrateFromLocalStorage() {
        await this.init();
        
        const results = {
            players: 0,
            sessions: 0,
            settings: false,
            errors: []
        };

        try {
            // Migrate players
            const playersData = localStorage.getItem('afoqt-math-players');
            if (playersData) {
                const players = JSON.parse(playersData);
                for (const player of players) {
                    try {
                        // Separate sessions from player object for new schema
                        const sessions = player.sessions || [];
                        const playerWithoutSessions = { ...player };
                        delete playerWithoutSessions.sessions;
                        
                        // Save player
                        await this.savePlayer(playerWithoutSessions);
                        results.players++;

                        // Save sessions separately
                        for (const session of sessions) {
                            try {
                                await this.saveSession({
                                    ...session,
                                    playerId: player.id
                                });
                                results.sessions++;
                            } catch (error) {
                                console.error('Error migrating session:', error);
                                results.errors.push(`Session migration error: ${error.message}`);
                            }
                        }
                    } catch (error) {
                        console.error('Error migrating player:', error);
                        results.errors.push(`Player migration error: ${error.message}`);
                    }
                }
                console.log(`Migrated ${results.players} players and ${results.sessions} sessions`);
            }

            // Migrate settings
            const settingsData = localStorage.getItem('afoqt-settings');
            if (settingsData) {
                try {
                    const settings = JSON.parse(settingsData);
                    await this.saveSettings({ id: 'global', ...settings });
                    results.settings = true;
                    console.log('Migrated settings');
                } catch (error) {
                    console.error('Error migrating settings:', error);
                    results.errors.push(`Settings migration error: ${error.message}`);
                }
            }

            // Mark migration as complete
            localStorage.setItem('afoqt-migration-complete', 'true');
            
        } catch (error) {
            console.error('Migration error:', error);
            results.errors.push(`General migration error: ${error.message}`);
        }

        return results;
    }

    /**
     * Check if migration has been completed
     * @returns {boolean}
     */
    hasMigrationCompleted() {
        return localStorage.getItem('afoqt-migration-complete') === 'true';
    }

    /**
     * Clear all data from database (for testing)
     * @returns {Promise<void>}
     */
    async clearAllData() {
        await this.init();
        
        const stores = [STORES.PLAYERS, STORES.SESSIONS, STORES.SETTINGS, STORES.QUESTION_HISTORY];
        const transaction = this.db.transaction(stores, 'readwrite');

        const clearPromises = stores.map(storeName =>
            new Promise((resolve, reject) => {
                const request = transaction.objectStore(storeName).clear();
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            })
        );

        await Promise.all(clearPromises);

        console.log('All database data cleared');
    }

    /**
     * Close database connection
     */
    close() {
        if (this.db) {
            this.db.close();
            this.db = null;
            this.initPromise = null;
        }
    }
}

// Export singleton instance
const afoqtDB = new AfoqtDatabase();

// Initialize database when module loads
if (typeof window !== 'undefined') {
    afoqtDB.init().catch(err => {
        console.error('Failed to initialize database:', err);
    });
}
