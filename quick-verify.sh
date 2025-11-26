#!/bin/bash

echo "🎮 AFOQT Quest - Quick Verification"
echo "==================================="
echo ""

echo "✓ Checking core files..."
for file in index.html app.js styles.css manifest.json sw.js patch-loader.js db.js; do
    if [ -f "$file" ]; then
        echo "  ✓ $file"
    else
        echo "  ✗ $file MISSING!"
    fi
done

echo ""
echo "✓ Checking assets..."
if [ -f "assets/libs/anime.min.js" ]; then echo "  ✓ anime.min.js"; else echo "  ✗ anime.min.js"; fi
if [ -f "assets/icons/icon-192.png" ]; then echo "  ✓ icon-192.png"; else echo "  ✗ icon-192.png"; fi
if [ -f "assets/icons/icon-512.png" ]; then echo "  ✓ icon-512.png"; else echo "  ✗ icon-512.png"; fi

echo ""
echo "✓ Checking documentation..."
if [ -d "docs" ]; then echo "  ✓ docs/ ($(ls docs/*.md 2>/dev/null | wc -l) files)"; fi
if [ -f "README.md" ]; then echo "  ✓ README.md"; fi
if [ -f "FULL_FEATURE_STATUS.md" ]; then echo "  ✓ FULL_FEATURE_STATUS.md"; fi

echo ""
echo "✓ Checking tests..."
if [ -d "tests" ]; then echo "  ✓ tests/ ($(ls tests/*.html 2>/dev/null | wc -l) test files)"; fi
if [ -f "test-checklist.html" ]; then echo "  ✓ test-checklist.html"; fi

echo ""
echo "✓ Checking question content..."
if [ -d "Test Content/Math" ]; then 
    echo "  ✓ Math content ($(ls "Test Content/Math"/*.json 2>/dev/null | wc -l) files)"
fi
if [ -d "Test Content/Vocabulary" ]; then 
    echo "  ✓ Vocabulary content ($(ls "Test Content/Vocabulary"/*.json 2>/dev/null | wc -l) files)"
fi

echo ""
echo "✓ Service Worker Cache Version:"
grep "CACHE_NAME" sw.js | head -1

echo ""
echo "==================================="
echo "✅ Verification complete!"
echo ""
echo "To start the app:"
echo "  python3 -m http.server 8000"
echo ""
echo "Then open:"
echo "  http://localhost:8000"
echo ""
