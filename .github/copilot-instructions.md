# AFOQT Quest - AI Coding Agent Instructions

## Project Overview
Offline-first PWA for AFOQT (Air Force Officer Qualifying Test) preparation with retro terminal UI, RPG mechanics, and procedurally generated questions.

## Architecture

### Core Components
- **app.js** (3000+ lines): Monolithic single-page app with all logic, no build step required
- **Global State**: Single `state` object (lines 320-355) manages screens, players, quiz sessions, settings
- **localStorage Persistence**: Players/profiles saved via `savePlayers()`, loaded on boot
- **Service Worker (sw.js)**: Cache-first strategy for offline support, v14 cache naming

### Question System Architecture
**Current (Procedural)**: Each topic has `generateQuestion(difficulty)` function that creates questions on-the-fly (see lines 400-1900)

**Patch 18 Migration (Content-Based)**: 
- JSON files in `Test Content/Vocabulary/` follow naming: `<subtopicId>_<difficulty>_part<N>.json`
- Schema: `{subtopicId, difficulty, part, questions: [{id, question, choices: {A,B,C,D}, answer, explanation}]}`
- Need registry structure: `questions[subjectId][subtopicId][difficulty] = Question[]`
- Aggregate parts (part1, part2, etc.) for same subtopic+difficulty into single pool

### Subject/Topic Hierarchy
```javascript
subjects = [{id, name, description}]  // 'math', 'verbal', 'reading', 'science', etc.
mathTopics = [{id, name, description, generateQuestion}]  // 27 math topics
verbalTopics = [{...}]  // Uses hardcoded passages (lines 1130-1220)
scienceTopics = [{...}]
```

**Patch 18 Introduces**: `isAfoqtOfficialSubject`, `mappedGameSubtopics`, `isOfficialAfoqtTopic` flags to distinguish official AFOQT content

## Quiz Flow & Modes

### Current Modes (lines 1919-2020)
- **practice**: 10 questions, immediate feedback
- **test**: 10 questions, simulation mode
- **sprint**: 5 questions, mixed difficulties

### Patch 18 Requirement: Study vs Practice Test Modes
- **studyMode**: Keep current behavior (immediate feedback after each question)
- **practiceTestMode**: NO feedback until completion, then show summary report with:
  - Overall score/percent
  - Breakdown by subject/subtopic/difficulty
  - List of missed questions
  - Full explanations only shown at end

**Implementation**: 
1. Add `state.quiz.showFeedback` flag
2. Modify `handleAnswer()` to conditionally show/hide feedback
3. Create end-of-test summary screen with analytics

### AFOQT Practice Tests (Patch 18)
Auto-generate practice tests for subjects where `isAfoqtOfficialSubject = true`:
- Pull only from subtopics with `isOfficialAfoqtTopic = true`
- Sample questions per `difficultyDistribution` (e.g., 35% beginner, 45% advanced, 20% expert)
- Default lengths: 40 (word knowledge), 40 (verbal analogies), 30 (reading comp)

## Development Patterns

### Question Generation (Current)
```javascript
generateQuestion: (difficulty) => {
    // Generate random values
    const correct = /* calculate answer */;
    const options = [correct, wrong1, wrong2, wrong3];
    return {
        prompt: "Question text",
        options: shuffleArray(options).map(String),
        correctIndex: shuffled.indexOf(correct),
        explanation: "Why this is correct"
    };
}
```

### Question Loading (Patch 18 Required)
```javascript
// Parse filename: synonyms_beginner_part1.json
// Extract: subtopicId='synonyms', difficulty='beginner'
// Map to subject via subjects[].mappedGameSubtopics
// Aggregate: questions['word_knowledge']['synonyms']['beginner'].push(...json.questions)
```

### Player/Session Tracking
- Players stored as `{id, name, sessions: [], rpgStats: {level, xp, strength, etc.}}`
- Each session: `{topicId, topicName, score, total, avgTime, timestamp}`
- RPG stats updated via `updatePlayerStats()` with difficulty multiplier (beginner: 1x, advanced: 1.5x, expert: 2x)

## UI/UX Conventions

### Retro Terminal Theme
- Cyan (#00ffff) primary color with glow effects
- CRT scanlines, ASCII art borders
- Matrix rain background during boot
- Particle effects on answer selection (lines 8-42)

### Audio System
- Web Audio API (lines 240-318)
- Separate volume controls per sfx type (nav, correct, wrong, levelup, boot, modal)
- Frequency modulation for beeps: `playSfx('correct')` = 800Hz, `playSfx('wrong')` = 200Hz

### Responsive Design
- Single `styles.css`, mobile-first approach
- Dynamic container sizing based on viewport
- Touch-friendly 48px minimum button sizes

## PWA Implementation

### Manifest
- `manifest.json`: Standalone display, tron theme color (#00ffff)
- Icons: 192x192, 512x512 maskable
- Scope: `./` for full offline capability

### Service Worker Pattern
```javascript
// Cache-first, fallback to network
// Version: CACHE_NAME = 'afoqt-quest-v14'
// Cached assets: index.html, styles.css, app.js, manifest.json
// Update version on any core file change
```

## Key File Locations

- **Question Content**: `Test Content/Vocabulary/*.json`, `Test Content/Math/*.json`
- **Patch Definitions**: `Test Content/Patch_18.json`
- **Icons**: `images/icon-192.png`, `images/icon-512.png`
- **No Build System**: Direct browser execution, edit and refresh

## Common Tasks

### Adding New Question Content
1. Create JSON in `Test Content/<Subject>/<subtopicId>_<difficulty>_part<N>.json`
2. Follow schema: `{subtopicId, difficulty, part, questions: [...]}`
3. Update Patch file to include new subtopicId in `mappedGameSubtopics`
4. Add loader logic to aggregate parts into question registry

### Updating Service Worker
1. Increment version: `CACHE_NAME = 'afoqt-quest-v15'`
2. Add new cached assets to `urlsToCache` if needed
3. Clear browser cache to test

### Adding New Subject
1. Add to `subjects` array
2. Create topic array (e.g., `newSubjectTopics = [{id, name, generateQuestion}]`)
3. Add case in `getTopicsForSubject()` (line ~1270)
4. Update boot screen messages if needed

## Testing Approach
- Manual browser testing (no automated tests)
- Test on multiple devices/browsers for PWA compatibility
- Verify localStorage persistence across sessions
- Check offline functionality after clearing cache

## Patch System (Patch 18)
When implementing patches:
1. Read `Test Content/Patch_XX.json` for spec
2. Parse `fileNamingConvention`, `questionRoutingRules`, `testModeRules`
3. Update question loading to support new registry structure
4. Preserve backward compatibility with existing procedural generators
5. Document any breaking changes in patch description
