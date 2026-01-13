# AFOQT Quest - Manual Testing Checklist

## ✅ Pre-Test Setup
- [ ] Hard refresh browser (Ctrl/Cmd+Shift+R) to clear service worker cache
- [ ] Open DevTools Console to check for errors
- [ ] Verify service worker registered (Application > Service Workers)

## 🎮 Core Game Flow

### Boot Sequence
- [ ] Matrix rain animation plays
- [ ] Boot messages appear sequentially
- [ ] "PRESS ANY KEY" prompt appears
- [ ] Sound effects play (if enabled)
- [ ] Transitions to player select screen

### Player Management
- [ ] "Create New Player" button visible
- [ ] Can create player with custom name
- [ ] Player appears in selection screen
- [ ] Can select existing player
- [ ] Player stats display correctly (Level, XP, RPG stats)
- [ ] Multiple players persist across sessions

### Subject Selection
- [ ] All subjects display with descriptions
- [ ] Subject icons/visuals render
- [ ] Can navigate back to player select
- [ ] Math Knowledge subject loads
- [ ] Vocabulary subject loads
- [ ] Reading Comprehension subject loads
- [ ] Science subject loads

### Topic Selection (Math Knowledge)
- [ ] Topics load from questionRegistry
- [ ] Topic names display correctly
- [ ] Topic descriptions show
- [ ] Question count displays
- [ ] Can navigate back to subject select
- [ ] Try these topics:
  - [ ] Slope and Rate of Change
  - [ ] Coordinate Geometry  
  - [ ] Transformations
  - [ ] Graph Interpretation

### Quiz Flow - Practice Mode
- [ ] Quiz loads with 10 questions
- [ ] Question counter shows (e.g., "Question 1 / 10")
- [ ] Timer displays and counts up
- [ ] Question prompt displays
- [ ] 4 answer choices (A, B, C, D) render
- [ ] Can select an answer
- [ ] "Submit Answer" button appears
- [ ] **Immediate feedback** shows after submit
- [ ] Correct answer highlights green
- [ ] Incorrect answer highlights red
- [ ] Explanation displays
- [ ] "Next Question" button appears
- [ ] Can progress through all questions
- [ ] Final score screen displays
- [ ] XP gained displays
- [ ] Stats updated
- [ ] Can return to topics

### Quiz Flow - Test Mode
- [ ] Quiz loads with 10 questions
- [ ] **No feedback** during quiz
- [ ] Selected answers show as highlighted
- [ ] Can complete all questions
- [ ] Summary screen at end shows:
  - [ ] Overall score/percentage
  - [ ] Breakdown by difficulty
  - [ ] List of missed questions
  - [ ] Explanations for all questions
  - [ ] XP gained

### Quiz Flow - Sprint Mode
- [ ] Quiz loads with 5 questions
- [ ] Mixed difficulty questions
- [ ] Immediate feedback enabled
- [ ] Faster completion
- [ ] XP bonus for sprint completion

## 📊 Math UI Rendering

### Slope Graphs
- [ ] Grid renders
- [ ] X and Y axes display
- [ ] Line connects two points
- [ ] Endpoints marked
- [ ] Positive/negative slopes visible
- [ ] Grid spacing correct

### Coordinate Points
- [ ] Grid and axes render
- [ ] Points plotted correctly
- [ ] Point labels display (A, B, C, etc.)
- [ ] Labels offset from points (readable)
- [ ] Multiple points on same graph

### Segments
- [ ] Line segment between two points
- [ ] Both endpoints marked
- [ ] Point labels display
- [ ] Segment length visual

### Triangles
- [ ] Three line segments form triangle
- [ ] All three vertices marked
- [ ] Vertex labels display
- [ ] Closed shape

### Transformations - Translation
- [ ] Original shape (solid cyan)
- [ ] Translated shape (ghost/translucent)
- [ ] Arrows from each point to new position
- [ ] Vector direction clear
- [ ] Grid and axes

### Transformations - Rotation
- [ ] Original shape (solid)
- [ ] Rotated shape (ghost)
- [ ] Center point marked
- [ ] Rotation arrows visible
- [ ] 90°, 180° rotations work

### Transformations - Reflection
- [ ] Original shape (solid)
- [ ] Reflected shape (ghost)
- [ ] Mirror line (dashed/patterned)
- [ ] Vertical/horizontal reflections
- [ ] Arrows showing reflection

### Function Tables/Rules
- [ ] Table renders with borders
- [ ] Headers styled (cyan background)
- [ ] Data rows readable
- [ ] Function rule box displays formula
- [ ] f(x) notation correct

## 💾 Data Persistence

### IndexedDB
- [ ] Player data saves
- [ ] Session history records
- [ ] Spaced repetition data stores
- [ ] Question tracking works
- [ ] Data persists after refresh
- [ ] Multiple players don't conflict

### LocalStorage Fallback
- [ ] Settings persist
- [ ] Theme selection saves
- [ ] Audio preferences save

### Service Worker
- [ ] Works offline after first load
- [ ] Caches updated content
- [ ] Hard refresh updates cache
- [ ] Version increments work (v63)

## 🎨 UI/UX Features

### Theme System
- [ ] Default (Tron) theme loads
- [ ] Can open settings
- [ ] EVA-01 theme works (purple/green)
- [ ] EVA-02 theme works (red/orange)
- [ ] RX-0 theme works (white/gold)
- [ ] EVA-03 theme works (yellow/black)
- [ ] Theme persists across sessions
- [ ] Colors update instantly

### Audio System
- [ ] Audio toggle in settings
- [ ] Volume controls work
- [ ] Per-effect volume sliders
- [ ] Navigation beeps
- [ ] Correct answer sound
- [ ] Wrong answer sound
- [ ] Level up fanfare
- [ ] Boot sequence audio

### Responsive Design
- [ ] Works on desktop (1920x1080)
- [ ] Works on tablet (768px)
- [ ] Works on mobile (375px)
- [ ] Touch controls work
- [ ] Buttons adequate size (48px minimum)
- [ ] Text readable at all sizes

## 🔧 Edge Cases & Error Handling

### Question Loading
- [ ] Handles missing uiSpec gracefully
- [ ] Falls back to procedural if no content
- [ ] Logs warnings for missing questions
- [ ] Doesn't crash on malformed JSON

### Quiz Edge Cases
- [ ] Can complete quiz with all wrong answers
- [ ] Can complete quiz with all correct answers
- [ ] Timer works beyond 60 seconds
- [ ] Return to topics mid-quiz works
- [ ] Refreshing mid-quiz handles gracefully

### Browser Compatibility
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (iOS/macOS)
- [ ] Works in private/incognito mode

## 📱 PWA Features

### Installation
- [ ] "Add to Home Screen" prompt appears (mobile)
- [ ] Install banner shows (desktop)
- [ ] App installs successfully
- [ ] Icon appears on home screen
- [ ] Opens in standalone mode
- [ ] No browser chrome visible

### Offline Mode
- [ ] Works without internet after first load
- [ ] Questions load offline
- [ ] Can complete quizzes offline
- [ ] Data saves offline
- [ ] Syncs when back online

### Manifest
- [ ] App name correct
- [ ] Icons load (192x192, 512x512)
- [ ] Theme color applies (#00ffff)
- [ ] Description accurate

## 🎯 Question Quality

### Math Content
- [ ] Questions are clear and unambiguous
- [ ] Answer choices are plausible
- [ ] Correct answers are actually correct
- [ ] Explanations are helpful
- [ ] Visuals match question context
- [ ] Difficulty progression makes sense

### Spaced Repetition
- [ ] Seen questions marked
- [ ] Due questions prioritized
- [ ] New questions mixed in
- [ ] Doesn't repeat too quickly
- [ ] Adapts to performance

## 🚀 Performance

### Load Times
- [ ] Initial load < 3 seconds
- [ ] Boot animation smooth (60fps)
- [ ] Subject select instant
- [ ] Quiz loads < 1 second
- [ ] Math UI renders instant
- [ ] No jank during animations

### Memory
- [ ] No memory leaks
- [ ] Can complete multiple quizzes
- [ ] Browser doesn't slow down
- [ ] Service worker efficient

## ✅ Final Checks

- [ ] No console errors
- [ ] No 404s in Network tab
- [ ] All assets load correctly
- [ ] Service worker updates properly
- [ ] Can complete full workflow:
  - Boot → Player Select → Create Player → Math Subject → Topic → Quiz → Complete → Return to Topics

---

## 🐛 Known Issues to Watch For

1. **Service Worker Caching**: May need hard refresh after updates
2. **IndexedDB Quota**: Check if quota exceeded on heavy usage
3. **CSS Class Conflicts**: Ensure graph classes don't conflict with theme
4. **Mobile Safari**: PWA features may be limited

## 📝 Testing Notes

**Tester**: _______________  
**Date**: _______________  
**Browser**: _______________  
**Device**: _______________  
**Pass Rate**: _____ / _____  

**Critical Bugs Found**:
- 
- 

**Minor Issues**:
- 
- 

**Recommendations**:
- 
- 
