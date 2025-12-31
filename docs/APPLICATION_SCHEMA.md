# AFOQT Quest - Application Schema & Architecture

Complete code architecture reference showing dependencies, data flow, and hierarchies for troubleshooting.

## 📋 Table of Contents
1. [File Load Order & Dependencies](#file-load-order--dependencies)
2. [State Management Hierarchy](#state-management-hierarchy)
3. [Data Flow & Storage Systems](#data-flow--storage-systems)
4. [Screen Hierarchy & Rendering](#screen-hierarchy--rendering)
5. [Question Loading Pipeline](#question-loading-pipeline)
6. [Event Flow & Key Functions](#event-flow--key-functions)
7. [Troubleshooting Guide](#troubleshooting-guide)

---

## File Load Order & Dependencies

```
index.html
  ↓
1. styles.css (loaded first, inline)
  ↓
2. sw.js (Service Worker, registered on boot)
  ↓
3. assets/libs/anime.min.js (Animation library)
  ↓
4. db.js (IndexedDB setup for spaced repetition)
  ↓
5. patch-loader.js (Question registry builder)
  ↓
6. full-practice-test-loader.js (AFOQT full test system)
  ↓
7. app.js (Main application logic, 12,700+ lines)
```

**Critical Dependencies:**
- `app.js` requires `patch-loader.js` for `questionRegistry` object
- `app.js` requires `full-practice-test-loader.js` for `fullPracticeTestConfig` object
- `app.js` requires `db.js` for `openDatabase()`, `recordAnswer()`, `getQuestionsWithSpacedRepetition()`
- All scripts must load before app initialization (`scriptLoaded()` callback system)

---

## State Management Hierarchy

```javascript
// Global state object (app.js lines 320-355)
state = {
  // Core state
  currentScreen: String,           // 'boot' | 'home' | 'subjects' | 'topics' | 'quiz' | 'results' | 'settings' | 'achievements' | 'players' | 'afoqt-difficulty-select'
  currentPlayer: Object | null,    // Player object with {id, name, sessions[], rpgStats{}, fullPracticeTestAttempts[]}
  allPlayers: Array,               // Array of all player objects
  
  // Quiz state
  quiz: {
    active: Boolean,                    // Whether quiz is running
    isFullPracticeTest: Boolean,        // AFOQT full test mode flag
    mode: String,                       // 'practice' | 'test' | 'sprint'
    topicId: String,                    // Current topic ID
    topicName: String,                  // Display name
    questions: Array,                   // Array of question objects
    currentIndex: Number,               // Current question index (0-based)
    answers: Array,                     // User answers (parallel to questions)
    startTime: Number,                  // Quiz start timestamp
    showFeedback: Boolean,              // Show immediate feedback flag
    
    // AFOQT Full Practice Test specific
    fullTestData: Object | null,        // {difficulty, sections[], allQuestions[], currentSectionIndex, attemptNumber}
    sections: Array,                    // Section objects with startIndex, endIndex, timeLimit
    currentSectionIndex: Number,        // Current section (0-11 for AFOQT)
    sectionTimerInterval: Number | null,// setInterval ID for section countdown
  },
  
  // Subject/Topic selection
  currentSubject: String | null,   // Selected subject ID
  selectedDifficulty: String,      // 'beginner' | 'advanced' | 'expert'
  
  // UI state
  theme: String,                   // Current theme ID
  volumes: Object,                 // Audio volume controls {boot, nav, correct, wrong, levelup, modal}
  
  // System state
  bootComplete: Boolean,           // Boot animation finished
  scriptsLoaded: Object,           // {db: Boolean, 'patch-loader': Boolean, 'full-practice-test-loader': Boolean}
}
```

**Key State Transitions:**
```
Initial: state.currentScreen = 'boot'
  ↓ Boot complete
state.currentScreen = 'players' (if no player) | 'home' (if player selected)
  ↓ User navigates
state.currentScreen = 'subjects' | 'afoqt-difficulty-select' | 'settings' | 'achievements'
  ↓ Quiz starts
state.currentScreen = 'quiz', state.quiz.active = true
  ↓ Quiz finishes
state.currentScreen = 'results', state.quiz.active = false
  ↓ User continues
state.currentScreen = 'home'
```

---

## Data Flow & Storage Systems

### 1. Question Registry (patch-loader.js)

```javascript
// Global object populated by patch-loader.js
questionRegistry = {
  'subject_id': {
    'subtopic_id': {
      beginner: [Question, Question, ...],
      advanced: [Question, Question, ...],
      expert: [Question, Question, ...]
    }
  }
}

// Example:
questionRegistry['math_knowledge']['algebra']['beginner'] = [
  {id: 'mk_alg_beg_001', question: '...', choices: {...}, answer: 'A', explanation: '...'},
  // ... more questions
]
```

**Population Flow:**
```
Patch JSON (Test Content/Patch_18.json)
  ↓ loaded by patch-loader.js
Define: subjectId, subtopics[], fileNamingConvention
  ↓
For each subtopic → Scan for matching JSON files
  ↓
Load: Test Content/<Subject>/<subtopicId>_<difficulty>_part<N>.json
  ↓
Aggregate parts → questionRegistry[subject][subtopic][difficulty]
  ↓
Used by: app.js topic generation functions
```

**Question Object Schema:**
```javascript
{
  id: String,                      // Unique identifier (e.g., 'mk_alg_beg_001')
  question: String,                // Question text
  choices: {                       // Answer choices
    A: String,
    B: String,
    C: String,
    D: String
  },
  answer: String,                  // Correct answer ('A', 'B', 'C', or 'D')
  explanation: String,             // Why answer is correct
  
  // Optional fields
  uiSpec: Object,                  // UI rendering specifications {type, data}
  steps: Array,                    // Step-by-step solution
  fastStrategy: String,            // Quick solving technique
  difficulty: String,              // 'beginner' | 'advanced' | 'expert'
  subtopicId: String,              // Subtopic identifier
  subjectId: String                // Subject identifier
}
```

### 2. AFOQT Full Practice Test (full-practice-test-loader.js)

```javascript
// Global object for AFOQT full tests
fullPracticeTestConfig = {
  config: Object | null,              // Loaded from Test Content/full_afoqt_practice_test_config_v1.json
  questionRegistry: {                 // Organized by section
    'verbal_analogies': {beginner: [], advanced: [], expert: []},
    'arithmetic_reasoning': {...},
    'word_knowledge': {...},
    'math_knowledge': {...},
    'reading_comprehension': {...},
    'situational_judgment': {...},
    'physical_science': {...},
    'table_reading': {...},
    'instrument_comprehension': {...},
    'block_counting': {...},
    'aviation_information': {...},
    'self_description': {...}
  },
  initialized: Boolean
}

// Test instance structure (returned by generateFullPracticeTest)
testData = {
  difficulty: String,                 // 'beginner' | 'advanced' | 'expert'
  sections: [
    {
      sectionId: String,               // 'verbal_analogies', etc.
      displayName: String,             // 'Verbal Analogies'
      questions: Array,                // Questions for this section
      answers: Array,                  // Parallel array for answers
      startIndex: Number,              // Index in allQuestions array
      endIndex: Number,                // Last index for this section
      timeLimitSeconds: Number,        // Official AFOQT time limit
      completed: Boolean,
      timeRemaining: Number
    },
    // ... 12 sections total
  ],
  allQuestions: Array,                 // Flattened array of all questions
  currentSectionIndex: Number,
  attemptNumber: Number
}
```

**AFOQT Test Flow:**
```
User clicks "AFOQT PRACTICE" on home screen
  ↓ renderScreen('afoqt-difficulty-select')
User selects difficulty (Beginner/Advanced/Expert)
  ↓ startAFOQTPracticeTest(difficulty)
  ↓ _startAFOQTPracticeTestAsync(difficulty)
Call: initializeFullPracticeTest()
  ↓ Loads config + builds question registry
Call: generateFullPracticeTest(difficulty)
  ↓ Returns testData with sections[] + allQuestions[]
Set: state.quiz.fullTestData = testData
Start first section: startAFOQTSectionTimer()
  ↓ Quiz begins with timer countdown
User answers questions → state.quiz.answers[currentIndex] = answer
  ↓ Section time expires OR user completes section
Call: advanceToNextSection()
  ↓ Shows transition modal, moves to next section
After all 12 sections complete:
  ↓ finishQuiz() → saveFullPracticeTestResult()
Calculate composites, save to state.currentPlayer.fullPracticeTestAttempts[]
  ↓ renderScreen('results')
Display: Section scores, composites (Verbal, Quantitative, Pilot, CSO, ABM, Academic)
```

### 3. Player Persistence (localStorage)

```javascript
// Stored in localStorage key: 'afoqt-quest-players'
localStorage.setItem('afoqt-quest-players', JSON.stringify([
  {
    id: String,                      // UUID
    name: String,                    // Player name
    sessions: [                      // Quiz history
      {
        topicId: String,
        topicName: String,
        score: Number,               // Correct answers
        total: Number,               // Total questions
        avgTime: Number,             // Average seconds per question
        timestamp: Number,           // Date.now()
        difficulty: String
      }
    ],
    rpgStats: {
      level: Number,                 // Player level (1-100)
      xp: Number,                    // Current XP
      xpToNextLevel: Number,         // XP needed for next level
      strength: Number,              // Math/Science stat
      wisdom: Number,                // Verbal/Reading stat
      speed: Number,                 // Table Reading/Aviation stat
      totalQuestionsAnswered: Number,
      totalCorrect: Number,
      totalStudySessions: Number
    },
    fullPracticeTestAttempts: [      // AFOQT full test history
      {
        attemptNumber: Number,
        difficulty: String,
        timestamp: Number,
        sectionScores: {              // Per-section results
          'verbal_analogies': {score: Number, total: Number, percentage: Number, blanks: Number},
          'arithmetic_reasoning': {...},
          'word_knowledge': {...},
          // ... all 12 sections
        },
        composites: {                 // AFOQT official composites
          verbal: Number,             // Verbal Analogies + Word Knowledge
          quantitative: Number,       // Arithmetic + Math
          pilot: Number,              // Math + Table + Instrument + Aviation
          cso: Number,                // Verbal + Math + Table + Block
          abm: Number,                // Verbal + Math + Table + Block
          academicAptitude: Number    // Verbal + Math + Reading
        },
        totalTime: Number              // Total elapsed seconds
      }
    ],
    achievements: Array,             // Unlocked achievements
    equippedItems: Object,           // {helmet, chest, weapon, shield}
    createdAt: Number
  }
]))
```

**Player Data Flow:**
```
App boot → loadPlayers()
  ↓ localStorage.getItem('afoqt-quest-players')
Parse JSON → state.allPlayers = [...]
  ↓
User selects player → state.currentPlayer = players.find(...)
  ↓
During quiz → answers recorded in state.quiz.answers[]
  ↓
Quiz complete → finishQuiz()
  ↓
Calculate score, update RPG stats: updatePlayerStats(score, total, difficulty)
  ↓ XP calculation with difficulty multiplier (1x/1.5x/2x)
Save session to state.currentPlayer.sessions[]
  ↓
Call: savePlayers()
  ↓ localStorage.setItem('afoqt-quest-players', JSON.stringify(state.allPlayers))
```

**RPG Stat Updates:**
```javascript
updatePlayerStats(score, total, difficulty)
  ↓
1. Calculate XP gained:
   baseXP = score * 10
   multiplier = {beginner: 1, advanced: 1.5, expert: 2}
   xpGained = baseXP * multiplier[difficulty]
  ↓
2. Update player.rpgStats:
   player.rpgStats.xp += xpGained
   player.rpgStats.totalQuestionsAnswered += total
   player.rpgStats.totalCorrect += score
   player.rpgStats.totalStudySessions++
  ↓
3. Check level up:
   while (player.rpgStats.xp >= player.rpgStats.xpToNextLevel) {
     player.rpgStats.level++
     player.rpgStats.xp -= player.rpgStats.xpToNextLevel
     player.rpgStats.xpToNextLevel = Math.floor(player.rpgStats.xpToNextLevel * 1.2)
   }
  ↓
4. Update stats based on subject:
   if (Math/Science topic) { player.rpgStats.strength++ }
   if (Verbal/Reading topic) { player.rpgStats.wisdom++ }
   if (Table/Aviation topic) { player.rpgStats.speed++ }
  ↓
5. Save: savePlayers()
```

### 4. Spaced Repetition (IndexedDB via db.js)

```javascript
// Database: 'AFOQT-Quest-DB', Store: 'questionHistory'
// Record structure:
{
  id: String,                        // Primary key: questionId
  questionId: String,                // Question identifier
  topicId: String,                   // Topic identifier
  attempts: Number,                  // Total times seen
  correctCount: Number,              // Times answered correctly
  lastAttempt: Number,               // Timestamp of last attempt
  nextReview: Number,                // Timestamp when due for review
  easeFactor: Number,                // SM-2 algorithm ease factor (1.3-2.5)
  interval: Number                   // Days until next review
}
```

**Spaced Repetition Flow:**
```
Quiz starts → getQuestionsWithSpacedRepetition(topicId, count)
  ↓ Open IndexedDB, query questionHistory store
Categorize questions:
  - dueItems: nextReview <= now
  - unseenItems: not in questionHistory
  - seenItems: all others
  ↓
Priority: dueItems → unseenItems → random seenItems
  ↓ Return shuffled array of questions
User answers question → recordAnswer(questionId, correct, timeSpent)
  ↓ Update questionHistory record
Calculate new: easeFactor, interval, nextReview (SM-2 algorithm)
  ↓ Put record back to IndexedDB
```

**SM-2 Algorithm Implementation:**
```javascript
recordAnswer(questionId, correct, timeSpent)
  ↓
Get existing record from questionHistory
  ↓
Update counts:
  record.attempts++
  if (correct) { record.correctCount++ }
  record.lastAttempt = Date.now()
  ↓
Calculate new interval (SM-2):
  if (correct) {
    if (record.attempts === 1) {
      interval = 1 day
    } else if (record.attempts === 2) {
      interval = 6 days
    } else {
      interval = previousInterval * easeFactor
    }
    easeFactor = Math.max(1.3, easeFactor + 0.1)
  } else {
    interval = 1 day
    easeFactor = Math.max(1.3, easeFactor - 0.2)
  }
  ↓
Set nextReview:
  record.nextReview = Date.now() + (interval * 24 * 60 * 60 * 1000)
  ↓
Save to IndexedDB
```

---

## Screen Hierarchy & Rendering

```
renderScreen(screenName)
  ├─ 'boot' → renderBootScreen()
  │   └─ Encom Globe animation, Matrix rain, startup sounds
  │
  ├─ 'home' → renderHomeScreen()
  │   ├─ Player info display (level, XP, stats)
  │   ├─ Tiles: "SUBJECTS", "AFOQT PRACTICE", "ACHIEVEMENTS", "SETTINGS"
  │   └─ Event: Click → renderScreen('subjects') or renderScreen('afoqt-difficulty-select')
  │
  ├─ 'subjects' → renderSubjectsScreen()
  │   ├─ Display: subjects[] array (math_knowledge, verbal, etc.)
  │   └─ Event: Click subject → state.currentSubject = subjectId, renderScreen('topics')
  │
  ├─ 'topics' → renderTopicsScreen()
  │   ├─ Call: getTopicsForSubject(state.currentSubject)
  │   ├─ Display: Topic tiles with difficulty selector
  │   └─ Event: Click topic → startQuiz(topicId, mode, difficulty)
  │
  ├─ 'afoqt-difficulty-select' → renderAFOQTDifficultySelect()
  │   ├─ Display: Beginner/Advanced/Expert tiles
  │   ├─ Section preview table (12 sections with timing)
  │   └─ Event: Click difficulty → startAFOQTPracticeTest(difficulty)
  │
  ├─ 'quiz' → renderQuizScreen()
  │   ├─ Display: Question, choices, timer, progress bar
  │   ├─ For AFOQT: Section name, section timer, section progress
  │   ├─ Render question UI: renderQuestionUI(question)
  │   │   ├─ question.uiSpec.type = 'math_ui' → renderMathUI(uiSpec)
  │   │   ├─ type = 'instrument_panel' → renderInstrumentPanel(uiSpec)
  │   │   ├─ type = 'data_table' → renderDataTable(uiSpec)
  │   │   ├─ type = 'reading_passage' → renderReadingPassage(uiSpec)
  │   │   └─ Default: render text only
  │   └─ Event: Answer click → handleAnswer(choiceLetter)
  │       ├─ Record answer: state.quiz.answers[currentIndex] = choiceLetter
  │       ├─ If showFeedback: Display correct/wrong, show explanation
  │       ├─ If AFOQT & section complete: advanceToNextSection()
  │       └─ If quiz complete: finishQuiz()
  │
  ├─ 'results' → renderResultsScreen()
  │   ├─ Display: Score, percentage, time stats
  │   ├─ If AFOQT: Section breakdown + 6 composites
  │   ├─ Show: Level up animation if applicable
  │   ├─ Missed questions review (if test mode)
  │   └─ Event: "CONTINUE" → renderScreen('home')
  │
  ├─ 'settings' → renderSettingsScreen()
  │   ├─ Theme selector (8 themes), audio volume controls
  │   └─ Event: Save → Update state, localStorage
  │
  ├─ 'achievements' → renderAchievementsScreen()
  │   ├─ Display: Unlocked/locked achievements with progress bars
  │   └─ Achievement categories: Questions, Sessions, Perfect Scores, Speed
  │
  └─ 'players' → renderPlayersScreen()
      ├─ List all players with stats, delete button
      ├─ Create new player form
      └─ Event: Select player → state.currentPlayer, renderScreen('home')
```

**Render Function Call Chain:**
```
User action (click, keypress)
  ↓
Event handler (onclick="...")
  ↓
Navigation function (e.g., selectSubject(subjectId))
  ↓
Update state (e.g., state.currentSubject = subjectId)
  ↓
renderScreen(newScreen)
  ↓
Clear #app container
  ↓
Call specific render function (e.g., renderTopicsScreen())
  ↓
Build HTML string
  ↓
Set #app.innerHTML = html
  ↓
Apply theme classes, animations
```

---

## Question Loading Pipeline

```
Topic Click → startQuiz(topicId, mode, difficulty)
  ↓
1. Get topic object: topics.find(t => t.id === topicId)
  ↓
2. Question source decision:
   │
   ├─ Has topic.generateQuestion? (Procedural)
   │   └─ Generate on-the-fly:
   │       for(i=0; i<count; i++) {
   │         questions.push(topic.generateQuestion(difficulty))
   │       }
   │
   └─ Else: Content-based (from registry)
       ├─ Call: getQuestionsFromRegistry(topicId, count, difficulty)
       │   ↓ Look up: questionRegistry[subjectId][topicId][difficulty]
       │   ↓ Shuffle pool
       │   └─ Return: sampled questions
       │
       └─ If spaced repetition enabled:
           └─ Call: getQuestionsWithSpacedRepetition(topicId, count)
  ↓
3. Set state:
   state.quiz.questions = questions
   state.quiz.answers = Array(questions.length).fill(null)
   state.quiz.currentIndex = 0
   state.quiz.active = true
   state.quiz.startTime = Date.now()
   state.quiz.showFeedback = (mode === 'practice')
  ↓
4. Render: renderScreen('quiz')
```

**Question Rendering Decision Tree:**
```
renderQuizScreen()
  ↓
Get current question: state.quiz.questions[state.quiz.currentIndex]
  ↓
Does question have uiSpec?
  ├─ YES → renderQuestionUI(question)
  │   ↓
  │   Switch on uiSpec.type:
  │   ├─ 'math_ui' → renderMathUI(uiSpec)
  │   │   ├─ uiSpec.subtype = 'coordinate_graph' → renderCoordinateGraph()
  │   │   ├─ uiSpec.subtype = 'geometry_diagram' → renderGeometryDiagram()
  │   │   ├─ uiSpec.subtype = 'transformation' → renderTransformation()
  │   │   └─ ... 20+ math UI subtypes
  │   │
  │   ├─ 'instrument_panel' → renderInstrumentPanel(uiSpec)
  │   │   └─ SVG aircraft with attitude indicator + compass
  │   │
  │   ├─ 'data_table' → renderDataTable(uiSpec)
  │   │   └─ HTML table with X/Y axis headers from tableSpec
  │   │
  │   └─ 'reading_passage' → renderReadingPassage(uiSpec)
  │       └─ Passage block + question block
  │
  └─ NO → Render text-only question
```

---

## Event Flow & Key Functions

### Quiz Lifecycle

```
startQuiz(topicId, mode, difficulty)
  → Load questions (procedural or from registry)
  → Set state.quiz properties
  → renderScreen('quiz')
  
  User answers:
  handleAnswer(choice)
    → state.quiz.answers[currentIndex] = choice
    → playSfx(correct ? 'correct' : 'wrong')
    → If showFeedback: displayFeedback(correct, explanation, steps, fastStrategy)
    → If spaced repetition enabled: recordAnswer(questionId, correct, timeSpent)
    → setTimeout(1500) → nextQuestion()
  
  nextQuestion()
    → state.quiz.currentIndex++
    → If currentIndex < questions.length:
        renderQuizScreen()
    → Else:
        finishQuiz()
  
  finishQuiz()
    → Calculate: score, total, avgTime, percentage
    → updatePlayerStats(score, total, difficulty)
    → Save session to player.sessions[]
    → savePlayers()
    → state.quiz.active = false
    → playSfx('levelup') if level increased
    → renderScreen('results')
```

### AFOQT Full Test Lifecycle

```
startAFOQTPracticeTest(difficulty)
  → _startAFOQTPracticeTestAsync(difficulty)
      → initializeFullPracticeTest()
          → Fetch: Test Content/full_afoqt_practice_test_config_v1.json
          → buildQuestionRegistry()
              → For each section: loadSectionQuestions(sectionId, difficulty)
              → Populate: fullPracticeTestConfig.questionRegistry
          → fullPracticeTestConfig.initialized = true
      → generateFullPracticeTest(difficulty)
          → Create sections[] array
          → Sample questions per section
          → Flatten to allQuestions[] array
          → Return testData object
      → state.quiz.fullTestData = testData
      → state.quiz.sections = testData.sections
      → state.quiz.isFullPracticeTest = true
      → startAFOQTSectionTimer()
      → renderScreen('quiz')
  
  Section timer:
  startAFOQTSectionTimer()
    → Get current section: sections[currentSectionIndex]
    → state.quiz.sectionTimerInterval = setInterval(1000, () => {
        section.timeRemaining--
        updateTimerDisplay()
        if (section.timeRemaining === 0) {
          autoSubmitSection()
        }
      })
  
  Section complete:
  advanceToNextSection()
    → clearInterval(state.quiz.sectionTimerInterval)
    → sections[currentSectionIndex].completed = true
    → state.quiz.currentSectionIndex++
    → If currentSectionIndex < 12:
        renderSectionTransitionModal()
        → User clicks "CONTINUE"
        → startAFOQTSectionTimer()
        → renderQuizScreen()
    → Else:
        finishQuiz()
  
  Test complete:
  finishQuiz()
    → If isFullPracticeTest:
        saveFullPracticeTestResult()
        → Calculate section scores from state.quiz.answers
        → calculateCompositeScores(sectionScores)
            → verbal = (VA + WK) / 2
            → quantitative = (AR + MK) / 2
            → pilot = (MK + TR + IC + AI) / 4
            → cso = (WK + MK + TR + BC) / 4
            → abm = (WK + MK + TR + BC) / 4
            → academicAptitude = (VA + WK + MK + RC) / 4
        → Create result object:
            {attemptNumber, difficulty, timestamp, sectionScores, composites, totalTime}
        → Push to: state.currentPlayer.fullPracticeTestAttempts[]
        → savePlayers()
    → renderScreen('results')
```

### Audio System

```
playSfx(type)
  ↓
Get volume: state.volumes[type]
  ↓
If volume > 0:
  Create: AudioContext, OscillatorNode, GainNode
  ↓
  Set frequency based on type:
    'correct' → 800Hz
    'wrong' → 200Hz
    'nav' → 400Hz
    'boot' → 600Hz sweep
    'levelup' → ascending arpeggio (500→700→900Hz)
    'modal' → 300Hz
  ↓
  Connect: oscillator → gain → destination
  ↓
  Start/stop: oscillator.start(), oscillator.stop(duration)
```

---

## Troubleshooting Guide

### Questions not loading?

**Symptoms:**
- Empty quiz screen
- "No questions available" message
- Console error: "Cannot read property 'beginner' of undefined"

**Diagnosis:**
1. Check: `console.log(questionRegistry)` - Should have subject → subtopic → difficulty structure
2. Check: `state.scriptsLoaded['patch-loader']` should be `true`
3. Check: JSON files exist at `/Test Content/<Subject>/<subtopicId>_<difficulty>_part<N>.json`
4. Check: Patch JSON has correct `fileNamingConvention` and `subtopics[]`

**Solutions:**
- Ensure `patch-loader.js` loads before `app.js` (check `<script>` order in index.html)
- Verify JSON file paths match naming convention: `<subtopicId>_<difficulty>_part<N>.json`
- Check browser console for 404 errors on JSON fetches
- Verify patch config exists at `Test Content/Patch_18.json`

---

### AFOQT test not starting?

**Symptoms:**
- Click "AFOQT PRACTICE" → nothing happens
- Stuck on difficulty selection screen
- Console error: "fullPracticeTestConfig is not defined"

**Diagnosis:**
1. Check: `fullPracticeTestConfig.initialized` should be `true`
2. Check: `fullPracticeTestConfig.questionRegistry` populated with all 12 sections
3. Check: Config file exists at `/Test Content/full_afoqt_practice_test_config_v1.json`
4. Console errors: Look for fetch failures or JSON parse errors

**Solutions:**
- Ensure `full-practice-test-loader.js` loaded: Check `state.scriptsLoaded['full-practice-test-loader']`
- Check file path: Must be `/AFOQT-app/Test Content/full_afoqt_practice_test_config_v1.json` for GitHub Pages
- Verify config JSON is valid (no trailing commas, proper quotes)
- Call `initializeFullPracticeTest()` manually in console to see detailed errors

---

### Score not saving?

**Symptoms:**
- Results screen shows score, but doesn't appear in player history
- Player stats (level, XP) not updating
- Console error: "Cannot read property 'sessions' of null"

**Diagnosis:**
1. Check: `state.currentPlayer` is not `null`
2. Check: localStorage quota not exceeded (Chrome DevTools → Application → Storage)
3. Check: `savePlayers()` called in `finishQuiz()`
4. Console: `localStorage.getItem('afoqt-quest-players')` should return JSON array

**Solutions:**
- Select a player before starting quiz (check home screen shows player name)
- Clear old localStorage data if quota exceeded: `localStorage.clear()` (WARNING: deletes all players)
- Verify `finishQuiz()` calls `updatePlayerStats()` then `savePlayers()`
- Check browser privacy settings allow localStorage

---

### UI rendering issues?

**Symptoms:**
- Blank screen
- Elements missing (buttons, text)
- CSS not applied correctly

**Diagnosis:**
1. Check: `state.currentScreen` matches expected screen name
2. Check: `renderScreen()` called with correct parameter
3. Console: Look for errors in render functions (e.g., `renderQuizScreen()`)
4. CSS: Verify theme class applied to `<body>` element

**Solutions:**
- Check `state.currentScreen` value: `console.log(state.currentScreen)`
- Verify render function exists: `typeof renderQuizScreen === 'function'`
- Inspect HTML structure: Chrome DevTools → Elements tab
- Check theme applied: `document.body.className` should include theme name (e.g., 'theme-tron')

---

### Timer not working (AFOQT)?

**Symptoms:**
- Section timer shows 0:00 or frozen
- Timer doesn't count down
- Auto-submit not triggering

**Diagnosis:**
1. Check: `state.quiz.sectionTimerInterval` has interval ID (number)
2. Check: `startAFOQTSectionTimer()` called when section starts
3. Check: `state.quiz.fullTestData.sections[currentSectionIndex].timeLimitSeconds` exists
4. Console: `clearInterval()` not being called prematurely

**Solutions:**
- Verify `startAFOQTSectionTimer()` called in `_startAFOQTPracticeTestAsync()`
- Check timer interval not cleared: `state.quiz.sectionTimerInterval !== null`
- Manually start timer: `startAFOQTSectionTimer()` in console
- Check `updateTimerDisplay()` function exists and updates DOM

---

### Math UI not rendering?

**Symptoms:**
- Math questions show text only, no graphs/diagrams
- Console error: "renderMathUI is not defined"

**Diagnosis:**
1. Check: Question has `uiSpec` field with `{type: 'math_ui', ...}`
2. Check: `renderMathUI()` function exists in app.js
3. Check: `uiSpec.subtype` matches available renderers

**Solutions:**
- Verify question JSON includes `uiSpec` field
- Check `renderQuestionUI()` calls `renderMathUI(uiSpec)` when `uiSpec.type === 'math_ui'`
- Add missing renderer: Create `render<Subtype>()` function in app.js
- Check CSS: Math UI styles in styles.css (`.math-ui-container`, `.coordinate-grid`, etc.)

---

### Service Worker cache stale?

**Symptoms:**
- Updates not appearing after push
- Old version of files loading

**Diagnosis:**
1. Check: Service worker version in sw.js (e.g., `CACHE_NAME = 'afoqt-quest-v110'`)
2. Chrome DevTools → Application → Service Workers → Check version

**Solutions:**
- Increment cache version in sw.js: `CACHE_NAME = 'afoqt-quest-v111'`
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Unregister SW: DevTools → Application → Service Workers → Unregister
- Clear cache: DevTools → Application → Clear storage → Clear site data

---

### IndexedDB spaced repetition errors?

**Symptoms:**
- Questions repeating immediately
- "Database error" in console
- Questions always in same order

**Diagnosis:**
1. Check: `db.js` loaded: `state.scriptsLoaded.db === true`
2. Check: Database opened successfully: `openDatabase()` returns promise
3. Check: Browser supports IndexedDB: `window.indexedDB !== undefined`

**Solutions:**
- Verify `db.js` loaded before quiz starts
- Check browser console for IndexedDB errors
- Clear database: Chrome DevTools → Application → IndexedDB → Delete database
- Fallback: Disable spaced repetition, use `getQuestionsFromRegistry()` only

---

## Quick Reference Commands

**Console Debug Commands:**
```javascript
// Check state
console.log(state)
console.log(state.currentPlayer)
console.log(state.quiz)

// Check registries
console.log(questionRegistry)
console.log(fullPracticeTestConfig)

// Check players
console.log(JSON.parse(localStorage.getItem('afoqt-quest-players')))

// Manually trigger functions
renderScreen('home')
initializeFullPracticeTest()
savePlayers()

// Test audio
playSfx('correct')
playSfx('wrong')
playSfx('levelup')

// Check scripts loaded
console.log(state.scriptsLoaded)

// Force re-render current screen
renderScreen(state.currentScreen)
```

**Useful Browser DevTools:**
- **Application Tab**: Service workers, localStorage, IndexedDB
- **Console Tab**: JavaScript errors, debug logs
- **Network Tab**: Failed resource loads (404s)
- **Elements Tab**: Inspect HTML/CSS
- **Sources Tab**: Set breakpoints in app.js

---

## File Location Quick Reference

| Component | File | Line Range | Purpose |
|-----------|------|------------|---------|
| State object | app.js | 320-355 | Global state management |
| Question registry | patch-loader.js | 1-1000+ | Loads and organizes all questions |
| AFOQT config | full-practice-test-loader.js | 1-607 | Full practice test system |
| Player management | app.js | 400-600 | Load/save players, updatePlayerStats |
| Screen rendering | app.js | 2000-10000 | All render*Screen() functions |
| Quiz logic | app.js | 6000-7000 | startQuiz, handleAnswer, finishQuiz |
| Math UI renderers | app.js | 8000-10000 | renderMathUI + 20+ subtypes |
| Spaced repetition | db.js | 1-200 | IndexedDB operations |
| Service worker | sw.js | 1-100 | PWA caching |
| Themes | styles.css | 1-3000 | Theme system + math UI styles |

---

Last Updated: December 30, 2024
