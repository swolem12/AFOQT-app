# AFOQT Quest - Air Force Officer Qualifying Test Prep

An offline-first Progressive Web App (PWA) for AFOQT preparation with retro terminal UI, RPG mechanics, and procedurally generated + content-based questions.

## 🚀 Quick Start

### Local Development
```bash
# Serve locally
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

### Live App
**[Play AFOQT Quest →](https://swolem12.github.io/AFOQT-app/)**

> **Note:** After updates, hard refresh (Ctrl+Shift+R / Cmd+Shift+R) to clear service worker cache.

## 📋 Features

### Core Functionality
- ✅ **Offline-First PWA**: Works without internet after first load
- ✅ **Retro Terminal UI**: Cyberpunk aesthetic with CRT scanlines and matrix rain
- ✅ **RPG Progression**: Level up with XP, stats (Strength, Wisdom, Speed), achievements
- ✅ **Multi-Player Support**: Create multiple player profiles with separate progress
- ✅ **Session Persistence**: Auto-save to localStorage, resume interrupted sessions

### Content & Questions
- ✅ **2,200+ Official AFOQT Questions** (Patches 18-22)
- ✅ **Content-Based System**: JSON-driven questions with rich metadata
- ✅ **6 Official AFOQT Subjects**:
  - Word Knowledge (Synonyms, Antonyms, Context Clues)
  - Arithmetic Reasoning (Word Problems, Algebra, Ratios)
  - Reading Comprehension (Passages with clustered questions)
  - Math Knowledge (27 topics: Algebra, Geometry, Trig, etc.)
  - Instrument Comprehension (Aircraft attitude/heading from instruments)
  - Table Reading (X/Y coordinate lookup with speed emphasis)
- ✅ **Practice Test Mode**: AFOQT-realistic simulations (no feedback until completion)
- ✅ **Study Mode**: Immediate feedback with explanations, fast strategies, step-by-step solutions

### Advanced UI Rendering
- ✅ **Math UI**: 20+ specialized renderers (coordinate graphs, transformations, geometry diagrams)
- ✅ **Reading Comprehension**: Passage blocks with clustered questions
- ✅ **Instrument Panel**: Attitude indicator, compass, aircraft silhouettes (SVG)
- ✅ **Data Tables**: X/Y axis clarity with column/row headers
- ✅ **LaTeX Math**: KaTeX support for equations

### Study Tools
- ✅ **Spaced Repetition**: Smart question selection via IndexedDB
- ✅ **Performance Analytics**: Track progress by subject/subtopic/difficulty
- ✅ **Difficulty Modes**: Beginner (1x XP), Advanced (1.5x), Expert (2x)
- ✅ **Theme System**: 8+ color schemes (Tron, EVA-01, RX-0, Stealth, Terminal Green, etc.)
- ✅ **Audio Effects**: Web Audio API beeps (correct, wrong, levelup, navigation)

## 📦 Latest Updates

### **Practice Test Enhancements** (Dec 13, 2024)
- **Feedback Toggle**: Switch between Study Mode (immediate feedback) and Practice Test Style (deferred feedback) mid-quiz
- **Composite Scores**: AFOQT results now show Verbal, Quantitative, Pilot, and CSO composite percentages
- **Section Analytics**: Per-section breakdown with timing and accuracy for AFOQT practice tests
- **Difficulty Distribution**: Sampling uses 35% beginner, 45% advanced, 20% expert distribution for official AFOQT content
- **Enhanced Persistence**: Session data includes subject/subtopic/difficulty breakdown for detailed analytics
- **Legacy Format Support**: Table renderer handles both `tableSpec` (new) and `tableData` (legacy) formats

### **Patch 22: Table Reading** (Dec 6, 2024)
- **152 Total Questions**: 50 beginner, 52 advanced (incl. axis clarity), 50 expert across 6 JSON files
- **tableSpec Format**: X/Y axis headers with cellValues grid for consistent rendering
- **Table Reading UI**: Scoped CSS grid with column/row headers, target cell highlighting in feedback
- **AFOQT Practice Test**: 40 questions, 7-minute timer, X/Y coordinate lookup emphasis
- **100% Validation**: All questions verified for tableSpec integrity and lookup accuracy

### **Patch 21: Instrument Comprehension** (Dec 6, 2024)
- 10 beginner questions with `instrument_panel` uiSpec
- `renderInstrumentPanel()`: Attitude indicator (bank/pitch) + Compass (heading)
- `renderInstrumentChoiceSprite()`: Realistic SVG aircraft silhouettes (side/front view)
- AFOQT Instrument Comprehension Practice Test (25 questions, 35/45/20 mix)
- Aircraft sprites match AFOQT exam style (grayscale, professional diagrams)

### **Patch 20: Reading Comprehension** (Dec 5, 2024)
- 20 beginner passages with 3-5 questions each
- `rc_passage_block` and `rc_question_block` renderers
- AFOQT Reading Comprehension Practice Test (20 questions)
- Passage clustering for realistic test experience

### **Patch 19: Arithmetic Reasoning** (Dec 4, 2024)
- 350+ questions across 8 subtopics (19 JSON files)
- Topics: Basic Arithmetic, Word Problems, Fractions/Decimals, Percents, Ratios, Time/Rate/Work, Averages, Algebra
- AFOQT Arithmetic Reasoning Practice Test (50 questions)
- Dynamic topic generation from questionRegistry

### **Patch 18: Math Knowledge & Vocabulary** (Nov 2024)
- 1,614 questions: 814 vocabulary + 800 math knowledge
- 27 math topics with specialized UI renderers
- AFOQT Word Knowledge Practice Test (40 questions)
- AFOQT Math Knowledge Practice Test (50 questions)

## 📁 Project Structure

```
AFOQT-app/
├── index.html              # Main app entry point
├── app.js                  # Core app logic (10,300+ lines)
├── styles.css              # CSS with theme system and math UI
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker (v75)
├── patch-loader.js         # Patch system & question registry (1,000+ lines)
├── db.js                   # IndexedDB for spaced repetition
├── assets/
│   ├── config/            # PWA build config
│   ├── icons/             # App icons (192x192, 512x512)
│   ├── libs/              # anime.js for animations
│   └── scripts/           # Utility scripts
├── Test Content/
│   ├── Patch_18.json      # Patch 18 config
│   ├── Vocabulary/        # 40 files (synonyms, antonyms, context clues)
│   ├── Math/              # 40 files (27 math topics)
│   ├── Arithmetic/        # 19 files (8 AR subtopics)
│   ├── Reading Comprehension/ # 20 passages
│   ├── Instrument Comprehension/ # IC questions + generator meta
│   └── Table Reading/     # 50 TR questions + axis clarity spec
├── docs/                  # Technical documentation
└── tests/                 # Manual test pages
```

## 🎮 Game Mechanics

### Player Progression
- **Levels**: Gain XP from answering questions (difficulty multipliers apply)
- **Stats**: Strength (Math/Science), Wisdom (Verbal/Reading), Speed (Table Reading)
- **Achievements**: Unlock badges for milestones (100 questions, 10 sessions, perfect scores)

### Quiz Modes
1. **Practice Mode** (Study):
   - 10 questions, immediate feedback
   - Explanations, fast strategies, step-by-step solutions
   - XP multiplier based on difficulty (1x/1.5x/2x)

2. **Test Mode** (Simulation):
   - 10 questions, no feedback until completion
   - Simulates test-taking conditions
   - 1.5x XP bonus

3. **Sprint Mode**:
   - 5 questions, mixed difficulties
   - Fast-paced practice

4. **Practice Test Mode** (AFOQT Official):
   - 20-50 questions (subject-dependent)
   - No feedback until end
   - Summary report with analytics (score, breakdowns, missed questions)
   - Realistic AFOQT test experience

## 🛠️ Technical Stack

### Architecture
- **Single-Page App**: No build step, vanilla JavaScript
- **Monolithic Design**: `app.js` contains all logic (screens, rendering, state, events)
- **Global State**: Single `state` object (lines 320-355 in app.js)
- **localStorage**: Player profiles, session data
- **IndexedDB**: Question history for spaced repetition (db.js)

### Question System
- **Registry Structure**: `questionRegistry[subjectId][subtopicId][difficulty] = Question[]`
- **JSON Schema**: `{id, question, choices: {A,B,C,D}, answer, explanation, uiSpec}`
- **Dynamic Loading**: Patch-based system scans for `<subtopicId>_<difficulty>_part<N>.json` files
- **Topic Generation**: `create<Subject>TopicsFromRegistry()` functions build topic lists

### UI Rendering
- **Math UI**: CSS-based graphs (no Canvas/SVG for performance)
  - Coordinate grids, transformations, geometry diagrams
  - `renderMathUI(uiSpec)` dispatcher with 20+ renderers
- **Instrument Comprehension**: SVG aircraft with rotation/bank transforms
- **Table Reading**: HTML tables with X/Y axis headers
- **Reading Comprehension**: Styled passage blocks + question blocks

### PWA Features
- **Service Worker**: Cache-first strategy (v75)
- **Offline Support**: All core assets cached
- **Installable**: Add to home screen on mobile/desktop
- **Manifest**: `display: standalone`, tron theme color (#00ffff)

## 🎨 Customization

### Themes
8 built-in themes accessible via Settings → Theme:
- **Tron** (default): Cyan (#00ffff) with CRT scanlines
- **EVA-01**: Purple/green (Evangelion-inspired)
- **RX-0**: White/gold (Gundam Unicorn)
- **Sinanju**: Red/gold
- **Stealth Black**: Grayscale minimalist
- **Terminal Green**: Classic green terminal
- **Dracula**: Purple/pink
- **Nord**: Blue/frost

### Audio
Web Audio API with frequency modulation:
- **Correct**: 800Hz beep
- **Wrong**: 200Hz buzz
- **Level Up**: Ascending arpeggio
- **Navigation**: 400Hz click
- Separate volume controls per effect type

## 📊 Content Statistics

### Total Questions: **2,200+**

| Subject | Topics | Questions | Beginner | Advanced | Expert |
|---------|--------|-----------|----------|----------|--------|
| Word Knowledge | 3 | 814 | 50 files | - | - |
| Math Knowledge | 27 | 800 | 40 files | - | - |
| Arithmetic Reasoning | 8 | 350+ | 350 | (planned) | (planned) |
| Reading Comprehension | 1 | 20 passages | 20 | (planned) | (planned) |
| Instrument Comprehension | 1 | 10 | 10 | (planned) | (planned) |
| Table Reading | 1 | 50 | 50 | (planned) | (planned) |

### AFOQT Practice Tests: **6**
- Word Knowledge: 40 questions
- Math Knowledge: 50 questions
- Arithmetic Reasoning: 50 questions
- Reading Comprehension: 20 questions
- Instrument Comprehension: 25 questions
- Table Reading: 40 questions

## 🚧 Roadmap

### Content Expansion
- [ ] Advanced/Expert questions for Patches 19-22
- [ ] Science Reasoning questions (official AFOQT subject)
- [ ] Aviation Information questions
- [ ] Block Counting (spatial reasoning)
- [ ] Full-length AFOQT simulation (all subjects combined)

### Features
- [ ] Study streaks and daily goals
- [ ] Leaderboards (Firebase integration)
- [ ] Question bookmarking/favorites
- [ ] Custom quiz builder
- [ ] Performance charts (Chart.js)
- [ ] Export session reports (PDF)

### Technical Improvements
- [ ] TypeScript migration
- [ ] React/Next.js refactor (optional)
- [ ] Question search/filter
- [ ] Keyboard shortcuts
- [ ] Mobile gesture controls
- [ ] Dark mode improvements

## 🤝 Contributing

### Adding Questions
1. Create JSON file in `Test Content/<Subject>/`
2. Follow naming: `<subtopicId>_<difficulty>_part<N>.json`
3. Schema: `{subjectId, subtopicId, difficulty, part, questions: [...]}`
4. Each question: `{id, question, choices: {A,B,C,D}, answer, explanation, [uiSpec], [steps], [fastStrategy]}`
5. Test with `tests/test-real-questions.html`

### Adding UI Renderers
1. Add `uiSpec.type` to question JSON
2. Create `render<Type>()` function in app.js
3. Add case to `renderMathUI()` switch
4. Style with inline CSS (retro terminal theme)

### Patch System
- Each patch = thematic content addition
- Patch config JSON defines schema, rules, acceptance criteria
- Loaders in `patch-loader.js` populate `questionRegistry`
- Topic creators in `app.js` generate topic arrays from registry

## 📄 License

MIT License - Free to use, modify, and distribute.

## 🙏 Credits

- **Developer**: @swolem12
- **Inspired by**: AFOQT study guides, retro terminal aesthetics, RPG progression systems
- **Libraries**: anime.js (animations), KaTeX (math rendering)
- **Icons**: Custom maskable icons for PWA

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/swolem12/AFOQT-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/swolem12/AFOQT-app/discussions)

---

**Last Updated**: December 6, 2024  
**Version**: Patch 22 (v75)  
**Questions**: 2,200+ across 6 official AFOQT subjects
