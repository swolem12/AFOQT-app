#!/usr/bin/env python3
"""
Extract lookup coordinates from question text for remaining questions
More aggressive pattern matching for X/Y coordinates
"""

import json
import re
from pathlib import Path
from typing import Optional, Tuple

def extract_xy_from_text(question: str) -> Optional[Tuple[int, int]]:
    """
    Extract X, Y coordinates from question text
    Patterns:
    - "X = 2, Y = 30" → (2, 30)
    - "X=2 and Y=30" → (2, 30)  
    - "X is 2, Y is 30" → (2, 30)
    - "row Y = 20, column X = 3" → (3, 20)
    - Single coordinate patterns (fallback to generic lookup)
    """
    
    # Try pattern: X = number, Y = number (most common)
    pattern1 = r'X\s*=\s*(\d+).*?Y\s*=\s*(\d+)'
    match = re.search(pattern1, question, re.IGNORECASE)
    if match:
        return (int(match.group(1)), int(match.group(2)))
    
    # Try pattern: X is number, Y is number
    pattern2 = r'X\s+is\s+(\d+).*?Y\s+is\s+(\d+)'
    match = re.search(pattern2, question, re.IGNORECASE)
    if match:
        return (int(match.group(1)), int(match.group(2)))
    
    # Try pattern: "column X = n" and "row Y = n" 
    pattern3 = r'column\s+X\s*=\s*(\d+).*?row\s+Y\s*=\s*(\d+)'
    match = re.search(pattern3, question, re.IGNORECASE)
    if match:
        return (int(match.group(1)), int(match.group(2)))
    
    # Try pattern: "row Y = n" and "column X = n" (reversed)
    pattern4 = r'row\s+Y\s*=\s*(\d+).*?column\s+X\s*=\s*(\d+)'
    match = re.search(pattern4, question, re.IGNORECASE)
    if match:
        return (int(match.group(2)), int(match.group(1)))  # Note: reversed for X, Y order
    
    # Try pattern: "value at X = n, Y = m"
    pattern5 = r'(?:value\s+)?at\s+X\s*=\s*(\d+).*?Y\s*=\s*(\d+)'
    match = re.search(pattern5, question, re.IGNORECASE)
    if match:
        return (int(match.group(1)), int(match.group(2)))
    
    # Try pattern with reverse: "Y = n ... X = m"
    pattern6 = r'Y\s*=\s*(\d+).*?X\s*=\s*(\d+)'
    match = re.search(pattern6, question, re.IGNORECASE | re.DOTALL)
    if match:
        return (int(match.group(2)), int(match.group(1)))  # Reverse to X, Y
    
    return None

def enrich_file_with_lookups(filepath: str, dry_run: bool = False) -> int:
    """
    Extract lookups from question text and add to questions missing lookup field
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    questions = data.get("questions", [])
    added = 0
    skipped = 0
    
    for idx, q in enumerate(questions):
        # Only process if question has no lookup
        if "lookup" not in q:
            coords = extract_xy_from_text(q.get("question", ""))
            if coords:
                x, y = coords
                q["lookup"] = {"x": x, "y": y}
                added += 1
            else:
                # Mark as no-lookup type (aggregate, search, etc.)
                q["lookup"] = None
                skipped += 1
    
    if not dry_run:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    
    return added

def main():
    """Enrich all table reading files with extracted lookups"""
    base_path = Path("Test Content/Table Reading")
    json_files = [f for f in base_path.glob("*.json") if "table_component_spec" not in f.name]
    
    print(f"\n{'='*80}")
    print(f"ENRICHING {len(json_files)} FILES WITH EXTRACTED LOOKUPS")
    print(f"{'='*80}\n")
    
    total_added = 0
    total_skipped = 0
    
    for filepath in sorted(json_files):
        print(f"Processing {filepath.name}...")
        try:
            added = enrich_file_with_lookups(str(filepath))
            with open(filepath, 'r') as f:
                data = json.load(f)
            
            # Count skipped (ones with lookup=None)
            skipped = sum(1 for q in data.get("questions", []) if q.get("lookup") is None)
            
            if added > 0 or skipped > 0:
                print(f"  ✅ Added {added} lookups, {skipped} marked as non-lookup types")
            else:
                print(f"  ✓ All questions already have lookup info")
            total_added += added
            total_skipped += skipped
        except Exception as e:
            print(f"  ❌ Error: {e}")
    
    print(f"\n{'='*80}")
    print(f"ENRICHMENT COMPLETE")
    print(f"{'='*80}")
    print(f"Total lookups extracted: {total_added}")
    print(f"Total non-lookup marked: {total_skipped}")
    print()

if __name__ == "__main__":
    main()
