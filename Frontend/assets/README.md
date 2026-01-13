# Assets

Organized static assets for the AFOQT Quest app.

## Directory Structure

### `/icons`
- App icons (192x192, 512x512)
- Instrument SVGs (altimeter, airspeed, attitude, etc.)
- Aircraft diagrams
- UI graphics

### `/libs`
- `anime.min.js` - Animation library for smooth transitions

### `/config`
- `pwabuilder-config.json` - PWA Builder configuration
- `generate-apk.sh` - APK generation script

### `/inspiration`
- Design reference materials
- UI mockups
- Theme inspirations
- Character screen concepts

## Usage

All asset paths in code should reference the `assets/` directory:

```javascript
// ✅ Correct
image: "assets/icons/asi/asi.svg"

// ❌ Incorrect
image: "images/asi/asi.svg"
```

## Adding New Assets

1. Place files in appropriate subdirectory
2. Update references in code
3. Add to service worker cache if needed
4. Commit with descriptive message
