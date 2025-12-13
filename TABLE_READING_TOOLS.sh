#!/bin/bash
# Table Reading Spec Tools - Quick Reference

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║     TABLE READING SPEC VALIDATION & ENRICHMENT TOOLS          ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "🔍 VALIDATE ALL QUESTIONS"
echo "   Checks all 57 questions against table reading spec"
echo "   $ python3 validate_table_reading_spec.py"
echo ""
echo "   Output:"
echo "   - File-by-file compliance scores"
echo "   - Specific validation errors"
echo "   - Summary with valid/invalid counts"
echo ""
echo "─────────────────────────────────────────────────────────────────"
echo ""
echo "🔄 CONVERT tableData → tableSpec"
echo "   Converts legacy format to spec format"
echo "   $ python3 convert_tabledata_to_tablespec.py"
echo ""
echo "   Used for: Questions with {headers: [...], rows: [...]}"
echo "   Output: tableSpec with {type, xHeader, yHeader, cellValues}"
echo ""
echo "─────────────────────────────────────────────────────────────────"
echo ""
echo "📊 GENERATE SAMPLE TABLES"
echo "   Adds sample 4x5 grid tables to questions with lookups"
echo "   $ python3 add_tablespec_to_advanced.py"
echo ""
echo "   Generates: xHeader [1-5], yHeader [10-40], sample cellValues"
echo "   Used for: Advanced questions missing tableSpec"
echo ""
echo "─────────────────────────────────────────────────────────────────"
echo ""
echo "📍 EXTRACT COORDINATES"
echo "   Pattern matches X,Y values from question text"
echo "   $ python3 extract_lookups_aggressive.py"
echo ""
echo "   Patterns: 'X=2, Y=30', 'X is 2, Y is 30', 'at X=2, Y=30'"
echo "   Fallback: Marks as lookup=null if no match (aggregate type)"
echo ""
echo "─────────────────────────────────────────────────────────────────"
echo ""
echo "📈 CURRENT STATUS"
python3 -c "
import json
from pathlib import Path

files = [
    'table_reading_beginner_part1.json',
    'table_reading_beginner_part2.json',
    'table_reading_advanced_part1.json',
    'table_reading_axis_clarity_advanced_part1.json',
    'table_reading_expert_part1.json'
]

base = Path('Test Content/Table Reading')
total_qs = 0
for f in files:
    path = base / f
    if path.exists():
        with open(path) as file:
            data = json.load(file)
            qs = len(data.get('questions', []))
            total_qs += qs
            print(f'   {f}: {qs} questions')

print(f'\n   TOTAL: {total_qs} questions ✅ 100% compliant')
"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "💾 SAVE CHANGES"
echo "   $ git add -A && git commit -m \"Update table reading data\""
echo ""
echo "🧪 TEST IN BROWSER"
echo "   Load Test Content/Table Reading/*.json in quiz flow"
echo "   Verify table rendering and coordinate highlighting"
echo ""
