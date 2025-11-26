# Test Harnesses

Test pages for isolated component testing and debugging.

## Math UI Tests
- `test-math-ui.html` - Isolated demos of all math renderers
- `test-real-questions.html` - Load actual question JSONs with visuals

## System Tests
- `test-patch18.html` - Patch 18 content loading
- `test-db.html` - IndexedDB operations
- `test-question-tracking.html` - Spaced repetition logic
- `test-content-loading.html` - Question registry population

## Demo Pages
- `boot-demo.html` - Boot sequence animation
- `install.html` - PWA installation instructions

## Running Tests

```bash
# Start local server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000/tests/
```

## Creating New Tests

1. Create `test-<feature>.html` in this directory
2. Include core dependencies:
   ```html
   <script src="../patch-loader.js"></script>
   <script src="../app.js"></script>
   ```
3. Add isolated test cases
4. Document in this README
