# AFOQT Quest - Air Force Officer Qualifying Test Prep

An offline-first Progressive Web App (PWA) for AFOQT preparation with retro terminal UI, RPG mechanics, and content-based questions.

## 🚀 Quick Start

### Local Development
```bash
# Serve locally
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

### Live App
Play the game on GitHub Pages:

`https://swolem12.github.io/AFOQT-app/`

If you use a custom repo for Pages (e.g., `AFOQT-Quest`), the link is:

`https://swolem12.github.io/AFOQT-Quest/`

Note: After updates, do a hard refresh (Ctrl+Shift+R) to get the latest service worker cache.

## 📋 Features

- **Offline-First PWA**: Works without internet after first load
- **Retro Terminal UI**: Cyberpunk aesthetic with CRT effects
- **RPG Progression**: Level up with XP, stats, and achievements
- **Content-Based Questions**: 1,600+ curated questions from JSON files
- **Multiple Subjects**: Math Knowledge, Vocabulary, Reading Comprehension, Science
- **Math UI Rendering**: CSS-based graphs, coordinate planes, transformations
- **Spaced Repetition**: Smart question selection based on performance
- **Practice Test Mode**: AFOQT-realistic test simulations
- **Theme System**: Multiple color schemes (Tron, EVA-01, RX-0, etc.)

## 📁 Project Structure

```
AFOQT-app/
├── index.html              # Main app entry point
├── app.js                  # Core application logic (8,700+ lines)
├── styles.css              # CSS with theme system and math UI
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker for offline support
├── patch-loader.js         # Patch 18 content system
├── db.js                   # IndexedDB for player data & spaced repetition
├── assets/
│   ├── icons/              # App icons and instrument SVGs
│   ├── libs/               # Third-party libraries (anime.js)
│   ├── config/             # Build configs (PWABuilder, APK)
│   └── inspiration/        # Design reference assets
├── Test Content/           # Question JSON files
│   ├── Math/               # Math Knowledge questions (58 files, 1,614 Qs)
│   ├── Vocabulary/         # Vocabulary questions
│   ├── Patch_18.json       # Content system configuration
│   └── *.json              # Subject indices
├── tests/                  # Test harnesses and demos
│   ├── test-math-ui.html   # Math UI renderer demos
│   ├── test-real-questions.html  # Load actual question JSONs
│   └── test-*.html         # Other test pages
└── docs/                   # Documentation
    ├── COPILOT_DIRECTION.md    # AI coding agent instructions
    ├── PATCH_18_SUMMARY.md     # Content system overview
    ├── DATABASE.md             # IndexedDB schema
    ├── MOBILE-INSTALL.md       # Mobile installation guide
    └── *.md                    # Additional docs
```

## 🎮 Game Mechanics

### RPG System
- **XP & Leveling**: Earn experience from quiz performance
- **Stats**: Strength, Intelligence, Wisdom, Charisma, Luck
- **Difficulty Multipliers**: Expert questions give 2x XP, Advanced 1.5x

### Quiz Modes
- **Practice**: 10 questions with immediate feedback
- **Test**: 10 questions in simulation mode
- **Sprint**: 5 mixed-difficulty questions
- **AFOQT Practice Test**: Full-length subject tests (30-40 questions)

### Question System (Patch 18)
Questions loaded from JSON files with metadata:
```json
{
  "id": "mk_slope_b_001",
  "question": "What type of slope does the line have?",
  "choices": {"A": "Positive", "B": "Negative", "C": "Zero", "D": "Undefined"},
  "answer": "A",
  "explanation": "The line rises from left to right...",
  "uiSpec": {
    "type": "slope_graph",
    "width": 300,
    "height": 300,
    "xRange": [-5, 5],
    "yRange": [-5, 5],
    "line": {"point1": {"x": -4, "y": -2}, "point2": {"x": 4, "y": 3}}
  }
}
```

## 🎨 Math UI Rendering

CSS-based visualizations for math questions:

### Supported Types
- **Slope Graphs**: Lines with endpoints on coordinate plane
- **Coordinate Points**: Labeled points with quadrant identification
- **Segments**: Line segments between two points
- **Triangles**: Three-point shapes with vertex labels
- **Transformations**:
  - Translation: Vector arrows, ghost shapes
  - Rotation: Center point, rotation arrows
  - Reflection: Mirror lines, reflected shapes
- **Function Tables**: Input/output tables
- **Function Rules**: f(x) notation display

### CSS Classes
```css
.graphContainer    /* Graph wrapper with border */
.graphGrid         /* Grid lines background */
.graphAxis         /* x/y axes */
.graphLine         /* Solid lines (original shapes) */
.graphLineGhost    /* Translucent lines (transformed) */
.graphPoint        /* Coordinate points */
.graphPointGhost   /* Transformed points */
.graphArrow        /* Translation/rotation arrows */
.graphArrowHead    /* Arrow tips */
.graphMirror       /* Reflection line */
.graphLabel        /* Point labels */
```

## 🛠️ Technical Details

### Core Technologies
- **Vanilla JavaScript**: No build step, direct browser execution
- **Service Worker**: Cache-first strategy for offline functionality
- **IndexedDB**: Player profiles, session history, spaced repetition
- **Web Audio API**: Retro beeps and UI sounds
- **Canvas API**: Particle effects
- **CSS Grid/Flexbox**: Responsive layouts

### State Management
Single global `state` object with:
```javascript
state = {
  screen: 'boot',
  currentPlayer: null,
  currentSubject: null,
  currentTopic: null,
  quiz: {
    questions: [],
    currentIndex: 0,
    selectedAnswer: null,
    mode: 'practice',
    difficulty: 'beginner',
    showFeedback: true
  }
}
```

### Performance
- **No build step**: Edit and refresh workflow
- **Lazy loading**: Questions loaded on-demand
- **Efficient spaced repetition**: IndexedDB queries with indexes
- **Cache versioning**: Service worker updates on file changes

## 📱 Mobile Installation

### Android (PWA)
1. Open in Chrome/Edge
2. Tap "Add to Home Screen"
3. Confirm installation

### iOS (PWA)
1. Open in Safari
2. Tap Share → "Add to Home Screen"
3. Name and confirm

### APK Build (Optional)
```bash
# See assets/config/generate-apk.sh
./assets/config/generate-apk.sh
```

## 🧪 Testing

### Unit Tests
```bash
# Open test harnesses
python3 -m http.server 8000

# Navigate to:
# - /tests/test-math-ui.html (renderer demos)
# - /tests/test-real-questions.html (actual JSONs)
# - /tests/test-patch18.html (content system)
# - /tests/test-db.html (IndexedDB)
```

### Manual Testing
1. Boot sequence animation
2. Player creation/selection
3. Subject selection
4. Topic browsing
5. Quiz flow (practice/test/sprint)
6. Math UI rendering
7. Spaced repetition
8. Offline functionality (airplane mode)

## 📊 Question Content

### Current Stats
- **Math Knowledge**: 1,614 questions across 29 subtopics
- **Vocabulary**: 500+ questions (synonyms, antonyms, analogies)
- **Reading Comprehension**: Passage-based questions
- **Science**: Aviation, physics, general science

### Adding Questions
1. Create JSON file in `Test Content/<Subject>/`
2. Follow naming: `<subtopicId>_<difficulty>_part<N>.json`
3. Use schema:
```json
{
  "subjectId": "math_knowledge",
  "subtopicId": "slope_and_rate_of_change",
  "difficulty": "beginner",
  "part": 1,
  "questions": [...]
}
```
4. Update `Patch_18.json` if adding new subtopics
5. Reload app (service worker auto-updates)

## 🎭 Themes

Available themes in Settings:
- **Default (Tron)**: Cyan/black cyberpunk
- **EVA-01**: Purple/green Evangelion
- **EVA-02**: Red/orange Evangelion
- **RX-0 Unicorn**: White/red/gold Gundam
- **EVA-03**: Black/yellow/orange

## 🤝 Contributing

### Development Workflow
1. Make changes to source files
2. Test locally with `python3 -m http.server 8000`
3. Update `sw.js` cache version (`CACHE_NAME`)
4. Commit and push to main
5. Hard refresh browsers (Ctrl/Cmd+Shift+R)

### Code Style
- Use existing patterns (monolithic app.js)
- Add comments for complex logic
- Preserve retro terminal aesthetic
- Test offline functionality

## 📄 License

MIT License - See LICENSE file for details

## 🔗 Links

- **Repository**: https://github.com/swolem12/AFOQT-app
- **Documentation**: See `/docs` folder
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions

---

**Version**: Patch 19 (Arithmetic Reasoning content + Patch 18 system)  
**Last Updated**: November 28, 2025  
**Service Worker Cache**: v73

### Patch 19 Highlights
- Added Arithmetic Reasoning JSON content set (word problems, percent, ratio/proportion, rates/time/work, fractions/decimals, algebra basics)
- Integrated registry loader for Arithmetic (`patch-loader.js`) and dynamic topic creation
- Resolved merge conflicts and upgraded service worker cache to `v73` for deployment
- Prepared groundwork for upcoming Arithmetic-specific UI renderers (part-whole bars, rate timelines, comparison bars)
