# Subject/Topic Wiring Analysis Report

**Date**: December 21, 2025  
**Status**: Critical Wiring Issues Found

## Summary

Several subjects have content files but are **not properly wired** in app.js. When users click these subjects, nothing happens because:
1. Topics return `null` from `generateQuestion()` 
2. Topics don't have `hasContent: true` flag
3. patch-loader doesn't populate question registries for these subjects

## Detailed Findings

### ❌ NOT WIRED - Physical Science (7 topics)
All Physical Science topics have content JSON files but are completely broken:

- `chemistry_basics` - Has 18+ JSON files in Test Content, but `generateQuestion` returns `null`
- `earth_space` - Has 9+ JSON files, returns `null`
- `electricity_magnetism` - Has 9+ JSON files, returns `null`
- `energy_heat` - Has 9+ JSON files, returns `null`
- `fluids_pressure` - Has 9+ JSON files, returns `null`
- `motion_mechanics` - Has 9+ JSON files, returns `null`
- `optics_waves` - Has 9+ JSON files, returns `null`

**Problem**: Comments say "Loaded from patch-loader.js physical_science question registry" but:
- No loader function exists for Physical Science
- No question registry is populated
- fallback to null instead of procedural generators

### ✅ PROPERLY WIRED - Content-Based Topics
These have `hasContent: true` and will load from registry:
- `instrument_comprehension` (Patch_21) ✅
- `table_reading` (Patch_22) ✅
- `block_counting` ✅

### ⚠️ FALLBACK ONLY - Procedural Topics
These use procedural generators (no content files):
- `math_knowledge` and all math subtopics
- `arithmetic_reasoning` and subtopics
- `vocabulary` - ACTUALLY HAS `getQuestionsWithSpacedRepetition` in patch-loader
- `reading_comprehension` - ACTUALLY HAS content loading
- `situational` (Situational Judgment)
- `aviation` (Aviation Information)

**Wait - Vocabulary and Reading Comp ARE wired, just through different path!** They check `subjectId` in `startQuiz()` before trying `generateQuestion()`.

## Root Cause

**Physical Science is the ONLY subject with:**
1. ✓ Content files present (18+ JSON files)
2. ✗ `hasContent` flag (missing)
3. ✗ Working loader in patch-loader.js (missing)
4. ✗ `generateQuestion()` that works (returns null)

## Content Files Available

### Physical Science Content Files
```
Test Content/Physical Science/
├── chemistry_basics (9 files: beginner_part1/2, advanced_part1/2, expert_part1/2)
├── earth_space (9 files)
├── electricity_magnetism (9 files)
├── energy_heat (9 files)
├── fluids_pressure (9 files)
├── motion_mechanics (9 files)
└── optics_waves (9 files)

Total: ~63 JSON files with thousands of questions
```

## Solutions Required

### Fix 1: Add Physical Science Loader to patch-loader.js
- Create `loadPhysicalScienceQuestions()` function
- Populate `questionRegistry['physical_science'][topicId][difficulty]`
- Called during initialization

### Fix 2: Mark Physical Science Topics in app.js
- Add `hasContent: true` to all 7 scienceTopics
- Keep `generateQuestion` as fallback (not `null`)
- Update comments to reflect the fix

### Fix 3: Ensure Initialization
- Call loader in `init()` or `loadAllPatches()`
- Add error handling for missing registry

## Files to Modify

1. **app.js** (lines 1803-1872)
   - Add `hasContent: true` to each science topic
   - Change `generateQuestion: () => null` to procedural generator

2. **patch-loader.js**
   - Add Physical Science content loading
   - Integrate with question registry system

## Priority

**CRITICAL** - Users cannot access Physical Science content at all
