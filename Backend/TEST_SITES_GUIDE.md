# AFOQT-App Test Sites & Debug Tools Guide

Complete reference for all testing, debugging, and admin sites in the AFOQT-App project.

---

## 🎮 Main Application

| Site | URL | Purpose |
|------|-----|---------|
| **Main App** | https://swolem12.github.io/AFOQT-app/ | Live AFOQT practice application |
| **Local Dev** | `http://localhost:8000/` | Local development server |

---

## 🧪 Content & Loader Testing

### Primary Content Validators

| Test | File | URL | Purpose |
|------|------|-----|---------|
| **Content Loading Test** | `/tests/test-content-loading.html` | https://swolem12.github.io/AFOQT-app/tests/test-content-loading.html | Verify all JSON files load correctly and populate question registry |
| **Real Questions Loader** | `/tests/test-real-questions.html` | https://swolem12.github.io/AFOQT-app/tests/test-real-questions.html | Display actual questions from content files for manual verification |
| **Patch 18 Config** | `/tests/test-patch_18.html` | https://swolem12.github.io/AFOQT-app/tests/test-patch_18.html | Validate Patch 18 configuration and subject mappings |

### Subject-Specific Tests

| Test | File | URL | Purpose |
|------|------|-----|---------|
| **Math UI Verification** | `/tests/test-math-ui.html` | https://swolem12.github.io/AFOQT-app/tests/test-math-ui.html | Test mathematical rendering and LaTeX support |
| **Geometry UI Verification** | `/tests/test-geometry-ui.html` | https://swolem12.github.io/AFOQT-app/tests/test-geometry-ui.html | Test geometry diagrams and coordinate system rendering |
| **Table Reading Render** | `/tests/test-table-reading.html` | https://swolem12.github.io/AFOQT-app/tests/test-table-reading.html | Validate table structure, styling, and data table rendering |
| **Block Counting Isometric** | `/tests/test-block-counting-iso.html` | https://swolem12.github.io/AFOQT-app/tests/test-block-counting-iso.html | Test isometric 3D cube rendering and visibility algorithms |

---

## 🔧 Admin & Debug Tools

### Admin Consoles

| Tool | File | URL | Purpose |
|------|------|-----|---------|
| **Admin Console** | `/tests/admin-console.html` | https://swolem12.github.io/AFOQT-app/tests/admin-console.html | Full admin dashboard with player management, question browsing, stats |
| **All Questions Browser** | `/tests/test-admin-all-questions.html` | https://swolem12.github.io/AFOQT-app/tests/test-admin-all-questions.html | Browse all loaded questions by subject/difficulty with filtering |
| **Question Tracking** | `/tests/test-question-tracking.html` | https://swolem12.github.io/AFOQT-app/tests/test-question-tracking.html | Track question statistics and coverage metrics |

### CSS & Style Verification

| Test | File | URL | Purpose |
|------|------|-----|---------|
| **CSS Verification** | `/tests/css-verification.html` | https://swolem12.github.io/AFOQT-app/tests/css-verification.html | Verify all CSS classes load and apply correctly to UI elements |
| **CSS Test** | `/css-test.html` | https://swolem12.github.io/AFOQT-app/css-test.html | Quick CSS rendering test |

### Database & Error Diagnostics

| Test | File | URL | Purpose |
|------|------|-----|---------|
| **Database Inspector** | `/tests/test-db.html` | https://swolem12.github.io/AFOQT-app/tests/test-db.html | Inspect localStorage player data, sessions, and RPG stats |
| **App.js Error Check** | `/tests/test-app-js-errors.html` | https://swolem12.github.io/AFOQT-app/tests/test-app-js-errors.html | Validate app.js syntax and catch runtime initialization errors |

---

## 🎬 Boot & Animation Testing

| Test | File | URL | Purpose |
|------|------|-----|---------|
| **Boot Sequence Demo** | `/tests/boot-demo.html` | https://swolem12.github.io/AFOQT-app/tests/boot-demo.html | Isolated boot animation (encom-globe + GSAP) testing |
| **Froststyle Prototype** | `/tests/fr0st-prototype.html` | https://swolem12.github.io/AFOQT-app/tests/fr0st-prototype.html | Original froststyle encom-globe reference implementation |

---

## 📋 Installation & Setup Tests

| Test | File | URL | Purpose |
|------|------|-----|---------|
| **PWA Install Test** | `/tests/install.html` | https://swolem12.github.io/AFOQT-app/tests/install.html | Test PWA installation, offline support, and service worker |
| **Manual Test Checklist** | `/tests/MANUAL_TEST_CHECKLIST.md` | N/A | Step-by-step manual testing procedures for all features |

---

## 🔗 Quick Access Bookmarks

### Frequently Used
- **Main App**: https://swolem12.github.io/AFOQT-app/
- **Admin Console**: https://swolem12.github.io/AFOQT-app/tests/admin-console.html
- **Content Loader**: https://swolem12.github.io/AFOQT-app/tests/test-content-loading.html
- **All Questions**: https://swolem12.github.io/AFOQT-app/tests/test-admin-all-questions.html

### CSS & Styling
- **CSS Verification**: https://swolem12.github.io/AFOQT-app/tests/css-verification.html
- **Table Reading**: https://swolem12.github.io/AFOQT-app/tests/test-table-reading.html
- **Block Counting**: https://swolem12.github.io/AFOQT-app/tests/test-block-counting-iso.html

### Diagnostics
- **Error Check**: https://swolem12.github.io/AFOQT-app/tests/test-app-js-errors.html
- **Database Inspector**: https://swolem12.github.io/AFOQT-app/tests/test-db.html
- **Patch 18 Config**: https://swolem12.github.io/AFOQT-app/tests/test-patch_18.html

---

## 🎯 Testing Workflows

### When Adding New Content

1. **Load Content**: https://swolem12.github.io/AFOQT-app/tests/test-content-loading.html
   - Verify file loads without 404 errors
   - Check question count matches expected

2. **Browse Questions**: https://swolem12.github.io/AFOQT-app/tests/test-admin-all-questions.html
   - Search for newly added content
   - Spot-check question quality and formatting

3. **Verify in Main App**: https://swolem12.github.io/AFOQT-app/
   - Start quiz with new subject/difficulty
   - Confirm questions appear in correct order
   - Check scoring and feedback

### When Fixing CSS Issues

1. **Check CSS File**: https://swolem12.github.io/AFOQT-app/tests/css-verification.html
   - Verify classes are defined
   - Check computed styles match expected values

2. **Test Subject**: Use appropriate subject test:
   - Table Reading: https://swolem12.github.io/AFOQT-app/tests/test-table-reading.html
   - Block Counting: https://swolem12.github.io/AFOQT-app/tests/test-block-counting-iso.html

3. **Full App Test**: https://swolem12.github.io/AFOQT-app/
   - Hard refresh (Ctrl+Shift+R)
   - Navigate to subject
   - Verify visual rendering

### When Debugging Loader Issues

1. **Run Content Loader Test**: https://swolem12.github.io/AFOQT-app/tests/test-content-loading.html
2. **Open Browser Console**: F12 → Console tab
3. **Look for errors**:
   - "Failed to load <filename>" → File missing or 404
   - "Invalid filename format" → parseFilename() regex issue
   - Registry empty → Loader function not called

4. **Check patch-loader.js**:
   - Verify filename parsing: [patch-loader.js#L169](patch-loader.js#L169)
   - Verify loader function exists and is async
   - Check registry initialization

### When Verifying Subject Works

1. **Admin All Questions**: https://swolem12.github.io/AFOQT-app/tests/test-admin-all-questions.html
2. **Filter by subject** (dropdown at top)
3. **Check metrics**:
   - Total questions by difficulty
   - All required topics present
   - No duplicate questions

4. **Main App Test**:
   - Select subject → Select topic → Select difficulty
   - Start quiz
   - Verify 10-question set loads
   - Check each question renders correctly

---

## 🐛 Common Issues & Quick Fixes

| Issue | Likely Cause | Test to Run | Fix |
|-------|--------------|------------|-----|
| Questions not loading | Patch loader not called | Content Loader Test | Check `initializePatch18()` in app.js startup |
| CSS not applying | Service Worker cache stale | CSS Verification | Increment CACHE_VERSION in sw.js |
| Subject "has no content" | Registry not built | All Questions Browser | Run Content Loader Test, check console for errors |
| Table/Block Counting broken | CSS classes missing | CSS Verification + subject test | Verify styles.css includes all classes |
| Boot animation stuck | GSAP/encom-globe CDN down | Boot Demo | Check browser console for 404 on CDN assets |
| Player data missing | localStorage cleared | Database Inspector | Load app, create player, check DB test |

---

## 📊 Test Site Architecture

### Frontend Tests (Load in Browser)
- All test files are standalone HTML + embedded JS
- No build required - direct execution
- Load app.js and patch-loader.js via `<script>` tags
- Use base href="/AFOQT-app/" for GitHub Pages compatibility

### Admin Consoles
- Full UI for browsing content
- Player management and statistics
- Real-time filtering and search
- Export capabilities (some)

### Diagnostic Tests
- Focused on single feature/subject
- Verbose console logging
- Color-coded pass/fail indicators
- Clear error messages with debugging steps

---

## 🚀 Deployment & Cache Busting

All test sites use cache-busting query parameters:
- `?v=admin1`, `?v=debug1`, etc.

When pushing updates:
1. Update source files
2. Increment version number in query param (if needed)
3. Commit and push to GitHub
4. **Clear browser cache** (Ctrl+Shift+Del) before testing on GitHub Pages
5. Or use **Hard Refresh** (Ctrl+Shift+R) on each test site

Service Worker cache version: Check `CACHE_NAME` in [sw.js](sw.js)
- Current: `v110`
- Bump when pushing major changes to app.js, styles.css, or patch-loader.js

---

## 📝 Adding New Test Sites

Template structure:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Test Site</title>
    <base href="/AFOQT-app/">
    <style>
        /* Minimal styling */
    </style>
</head>
<body>
    <h1>Test: Feature Name</h1>
    <div id="output"></div>
    
    <!-- Load shared dependencies -->
    <script src="/AFOQT-app/patch-loader.js?v=test1"></script>
    <script src="/AFOQT-app/app.js?v=test1"></script>
    
    <!-- Test logic -->
    <script>
        async function runTests() {
            // Your test code here
        }
        runTests();
    </script>
</body>
</html>
```

Save to `/tests/<name>.html` and add to this guide.

---

## 🔍 Troubleshooting Guide

### Test Site Won't Load
**Symptom**: 404 or blank page
**Check**:
- base href matches actual path
- file exists at /tests/<name>.html
- no typos in filenames

### Content Not Showing
**Symptom**: "No questions found" in browser
**Check**:
- Run Content Loader Test first
- Check console for fetch errors
- Verify JSON files exist in Test Content/
- Check patch-loader.js can reach directory

### CSS Not Working
**Symptom**: Unstyled elements, missing colors/borders
**Check**:
- Hard refresh browser (Ctrl+Shift+R)
- Bump Service Worker CACHE_NAME
- Run CSS Verification test
- Check computed styles in DevTools

### Tests Pass Locally, Fail on GitHub Pages
**Symptom**: Works on localhost:8000, fails on swolem12.github.io
**Cause**: Path differences
**Fix**:
- Use absolute paths: `/AFOQT-app/file.js`
- Use base href in HTML head
- Test on GitHub Pages after push, not just locally

---

Last Updated: December 29, 2025  
Repository: https://github.com/swolem12/AFOQT-app
