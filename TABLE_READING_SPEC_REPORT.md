# Table Reading Spec Validation Report

## Summary

| Metric | Value |
|--------|-------|
| **Total Questions** | 57 |
| **Compliant (✅)** | 31 (54%) |
| **Non-Compliant (❌)** | 26 (46%) |
| **Files Checked** | 6 |

## Compliance Breakdown by File

| File | Questions | Valid | Invalid | Compliance |
|------|-----------|-------|---------|------------|
| table_reading_beginner_part1.json | 25 | 19 | 6 | ✅ 76% |
| table_reading_beginner_part2.json | 25 | 12 | 13 | ⚠️ 48% |
| table_reading_advanced_part1.json | 3 | 0 | 3 | ❌ 0% |
| table_reading_axis_clarity_advanced_part1.json | 2 | 0 | 2 | ❌ 0% |
| table_reading_expert_part1.json | 2 | 0 | 2 | ❌ 0% |
| patch_20_table_reading_axis_clarity.json | 0 | 0 | 0 | — |

## What Was Enriched

✅ **Successfully Added:**
- `lookup` coordinates to 57/57 questions (100% auto-extracted from question text)
- `tableSpec` to 50/57 questions (88% added from file-level specs)

⚠️ **Remaining Issues:**
- 26 questions still missing `lookup` or have invalid coordinates
- 5 questions missing `tableSpec` (special case files with different structures)

## Issues by Type

### Missing or Invalid Lookup (13 questions)

These questions have text that doesn't match the standard "X = n and Y = n" pattern:

**Examples:**
- "Which X–Y combination gives the largest number in the entire table?" (search, not lookup)
- "In which row (Y value) does the number 30 appear?" (single-axis)
- "Which of the following cells has the smallest value?" (no explicit coordinates)

**Solution:** Manual correction or special handling for these question types.

### Missing tableSpec (5 questions)

**Files affected:**
- table_reading_advanced_part1.json (3 questions)
- table_reading_axis_clarity_advanced_part1.json (2 questions)
- table_reading_expert_part1.json (2 questions)

**Reason:** These files have custom table structures not standard across the question set.

**Solution:** Add custom `tableSpec` to each file or enrich manually.

## Validation Tools Created

1. **validate_table_reading_spec.py**
   - Validates all questions against the spec
   - Checks: tableSpec structure, lookup coordinates, question fields
   - Run: `python3 validate_table_reading_spec.py`

2. **enrich_table_reading_lookup.py**
   - Auto-extracts X/Y coordinates from question text
   - Adds `lookup` field to questions
   - Run: `python3 enrich_table_reading_lookup.py`

3. **convert_table_reading_spec.py**
   - Flattens file-level tableSpec to per-question level
   - Matches component spec requirement (each question has its own tableSpec)
   - Run: `python3 convert_table_reading_spec.py`

## Next Steps

1. **Fix Remaining 26 Questions (46%)**
   - Review questions with missing/invalid lookup
   - Manually add explicit `x` and `y` to each question's lookup object
   - Update special case files with complete tableSpec

2. **Validate Again**
   ```bash
   python3 validate_table_reading_spec.py
   ```
   Goal: 100% compliance (57/57 ✅)

3. **Use in Component**
   - Once all questions are spec-compliant, the TableReadingTable component can:
     - Render without parsing text (use explicit lookup)
     - Highlight target cells reliably
     - Stay fully scoped (no CSS bleed into app UI)

## Spec Reference

See [table_reading_table_component_spec.json](test_content/table_reading_table_component_spec.json) for:
- Data contract (tableSpec, question, lookup schemas)
- Component API (props, behavior)
- CSS isolation requirements
- Visual design tokens
- Render structure

---

**Generated:** Dec 13, 2025
**Status:** In Progress (54% compliant)
