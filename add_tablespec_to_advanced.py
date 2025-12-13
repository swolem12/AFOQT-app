#!/usr/bin/env python3
"""
Add sample tableSpec to questions that have lookups but no tableSpec
"""

import json
from pathlib import Path

def add_sample_tablespec(filepath: str, rows: int = 5, cols: int = 5) -> int:
    """
    Add sample tableSpec to all questions with lookup but missing tableSpec
    Creates a grid with X from 1 to cols, Y from 10 to 10*(rows)
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    questions = data.get("questions", [])
    added = 0
    
    for q in questions:
        if "lookup" in q and "tableSpec" not in q:
            # Create a sample grid table
            x_header = list(range(1, cols + 1))
            y_header = list(range(10, 10 * (rows + 1), 10))
            
            # Create sample cell values (random between 10-50)
            cell_values = []
            for y_idx in range(rows):
                row = []
                for x_idx in range(cols):
                    # Use a simple pattern: x + y*10
                    value = (x_idx + 1) + (y_idx * 10) + 10
                    row.append(value)
                cell_values.append(row)
            
            q["tableSpec"] = {
                "type": "lookup_table",
                "xHeader": x_header,
                "yHeader": y_header,
                "cellValues": cell_values
            }
            added += 1
    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    return added

def main():
    """Add tableSpec to advanced files"""
    files_to_fix = {
        "Test Content/Table Reading/table_reading_advanced_part1.json": (4, 5),  # 4 rows, 5 cols
        "Test Content/Table Reading/table_reading_axis_clarity_advanced_part1.json": (4, 5),  # 4 rows, 5 cols
    }
    
    print(f"\n{'='*80}")
    print(f"ADDING SAMPLE tableSpec TO ADVANCED FILES")
    print(f"{'='*80}\n")
    
    total_added = 0
    
    for filepath, (rows, cols) in files_to_fix.items():
        if Path(filepath).exists():
            print(f"Processing {Path(filepath).name}...")
            try:
                added = add_sample_tablespec(filepath, rows, cols)
                print(f"  ✅ Added tableSpec to {added} questions (grid: {rows}x{cols})")
                total_added += added
            except Exception as e:
                print(f"  ❌ Error: {e}")
        else:
            print(f"  ⚠️  File not found: {filepath}")
    
    print(f"\n{'='*80}")
    print(f"COMPLETE: Added tableSpec to {total_added} questions")
    print(f"{'='*80}\n")

if __name__ == "__main__":
    main()
