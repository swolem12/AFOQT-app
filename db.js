// ============================================================================
// AFOQT Quest - IndexedDB Database Module
// Manages persistent storage for user profiles, sessions, and settings
// ============================================================================

const DB_NAME = 'afoqt-quest-db';
const DB_VERSION = 1;

// Object store names
const STORES = {
    PLAYERS: 'players',
    SESSIONS: 'sessions',
    SETTINGS: 'settings'
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
                console.log('Upgrading database schema...');

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
        
        const transaction = this.db.transaction(
            [STORES.PLAYERS, STORES.SESSIONS, STORES.SETTINGS], 
            'readwrite'
        );

        await Promise.all([
            new Promise((resolve, reject) => {
                const request = transaction.objectStore(STORES.PLAYERS).clear();
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            }),
            new Promise((resolve, reject) => {
                const request = transaction.objectStore(STORES.SESSIONS).clear();
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            }),
            new Promise((resolve, reject) => {
                const request = transaction.objectStore(STORES.SETTINGS).clear();
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            })
        ]);

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
