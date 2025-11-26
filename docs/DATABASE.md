# AFOQT Quest - Database System Documentation

## Overview

AFOQT Quest now uses **IndexedDB** for persistent storage of user data, replacing the previous localStorage implementation. This provides better performance, larger storage capacity, and more structured data management.

## Database Structure

### Database Name
`afoqt-quest-db`

### Object Stores

#### 1. **players**
Stores user profile information and RPG statistics.

**Schema:**
```javascript
{
  id: string,              // Primary key (timestamp-based)
  name: string,           // Player display name
  stats: {                // Per-topic statistics
    [topicId]: {
      correctAnswers: number,
      statPoints: number
    }
  },
  achievements: string[], // Array of unlocked achievement IDs
  challengeProgress: {},  // Challenge completion tracking
  equipment: {}           // Equipped items (optional)
}
```

**Indexes:**
- `name` - For searching players by name

#### 2. **sessions**
Stores individual quiz session results.

**Schema:**
```javascript
{
  id: number,             // Auto-incremented primary key
  playerId: string,       // Foreign key to players
  topicId: string,        // Topic identifier
  topicName: string,      // Human-readable topic name
  score: number,          // Questions answered correctly
  total: number,          // Total questions in session
  avgTime: number,        // Average time per question (seconds)
  timestamp: number,      // Session completion timestamp
  difficulty: string      // 'beginner' | 'advanced' | 'expert'
}
```

**Indexes:**
- `playerId` - Query all sessions for a player
- `topicId` - Query sessions by topic
- `timestamp` - Query sessions by date
- `playerIdTimestamp` - Composite index for efficient recent session queries

#### 3. **settings**
Stores application settings and preferences.

**Schema:**
```javascript
{
  id: string,             // Primary key (typically 'global')
  theme: string,          // 'default' | 'eva01' | 'eva02' | 'rx0'
  visualEffects: {
    glassmorphism: boolean,
    neonBorders: boolean,
    floatingAnimations: boolean,
    gradientEffects: boolean,
    premiumButtons: boolean
  },
  volumes: {
    master: number,       // 0.0 - 1.0
    nav: number,
    correct: number,
    wrong: number,
    levelup: number,
    boot: number,
    modal: number,
    bgMusic: number
  },
  bgMusicEnabled: boolean
}
```

## API Reference

### Initialization

The database is automatically initialized when the app loads:

```javascript
await afoqtDB.init();
```

### Player Operations

#### Get All Players
```javascript
const players = await afoqtDB.getAllPlayers();
```

#### Get Player by ID
```javascript
const player = await afoqtDB.getPlayer(playerId);
```

#### Save Player
```javascript
await afoqtDB.savePlayer(playerObject);
```

#### Delete Player
```javascript
await afoqtDB.deletePlayer(playerId);
```

### Session Operations

#### Save Session
```javascript
const sessionId = await afoqtDB.saveSession({
  playerId: 'player-123',
  topicId: 'linear_equations',
  topicName: 'Linear Equations',
  score: 8,
  total: 10,
  avgTime: 5.5,
  timestamp: Date.now(),
  difficulty: 'beginner'
});
```

#### Get All Sessions for Player
```javascript
const sessions = await afoqtDB.getPlayerSessions(playerId);
```

#### Get Recent Sessions
```javascript
const recentSessions = await afoqtDB.getRecentPlayerSessions(playerId, limit);
```

#### Delete All Sessions for Player
```javascript
await afoqtDB.deletePlayerSessions(playerId);
```

### Settings Operations

#### Get Settings
```javascript
const settings = await afoqtDB.getSettings('global');
```

#### Save Settings
```javascript
await afoqtDB.saveSettings({
  id: 'global',
  theme: 'eva01',
  visualEffects: { ... },
  volumes: { ... },
  bgMusicEnabled: false
});
```

### Utility Operations

#### Migrate from localStorage
```javascript
const results = await afoqtDB.migrateFromLocalStorage();
// Returns: { players: count, sessions: count, settings: boolean, errors: [] }
```

#### Check Migration Status
```javascript
const migrated = afoqtDB.hasMigrationCompleted();
```

#### Clear All Data
```javascript
await afoqtDB.clearAllData();
```

#### Close Database
```javascript
afoqtDB.close();
```

## Migration from localStorage

The system automatically migrates existing data from localStorage to IndexedDB on first load:

1. **Players**: Migrated from `afoqt-math-players` localStorage key
2. **Sessions**: Extracted from player objects and stored separately
3. **Settings**: Migrated from `afoqt-settings` localStorage key

After successful migration, a flag is set in localStorage (`afoqt-migration-complete`) to prevent duplicate migrations.

## Data Flow

### Creating a Player
```
User Input → createPlayer() → afoqtDB.savePlayer() → IndexedDB
```

### Completing a Quiz
```
Quiz Complete → finishQuiz() → afoqtDB.saveSession() → IndexedDB
                              → updatePlayerStats()
                              → afoqtDB.savePlayer()
```

### Loading App Data
```
App Init → loadPlayers() → afoqtDB.getAllPlayers() → Load sessions for each player
        → loadSettings() → afoqtDB.getSettings('global')
```

## Testing

A comprehensive test page is available at `test-db.html` that allows you to:

- Test database initialization
- Create and retrieve players
- Create and query sessions
- Save and load settings
- Test migration functionality
- Clear all data

Access it at: `http://localhost:8080/test-db.html` (or your server URL)

## Browser Compatibility

IndexedDB is supported in all modern browsers:
- Chrome/Edge 24+
- Firefox 16+
- Safari 10+
- Mobile browsers (iOS Safari 10+, Chrome Android)

## Storage Limits

IndexedDB provides much larger storage than localStorage:
- **localStorage**: ~5-10 MB
- **IndexedDB**: Typically 50+ MB (varies by browser, can be hundreds of MB)

## Performance Benefits

1. **Asynchronous**: Non-blocking database operations
2. **Indexed Queries**: Fast lookups using indexes
3. **Transactions**: Atomic operations ensure data consistency
4. **Larger Capacity**: Store thousands of sessions without issues
5. **Structured Data**: Proper relational design with foreign keys

## Error Handling

All database operations include error handling:

```javascript
try {
  await afoqtDB.savePlayer(player);
} catch (error) {
  console.error('Failed to save player:', error);
  // Handle error gracefully
}
```

## Debugging

To inspect the database in Chrome DevTools:

1. Open DevTools (F12)
2. Go to **Application** tab
3. Expand **IndexedDB** → **afoqt-quest-db**
4. View/edit data in each object store

## Future Enhancements

Potential improvements for the database system:

- [ ] Add data export/import functionality
- [ ] Implement database versioning for schema migrations
- [ ] Add data compression for sessions
- [ ] Implement sync to cloud storage (optional)
- [ ] Add database backup/restore features
- [ ] Performance monitoring and analytics
