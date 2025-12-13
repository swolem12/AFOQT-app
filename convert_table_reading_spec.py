#!/usr/bin/env python3
"""
Table Reading Structure Converter
Converts file-level tableSpec to per-question tableSpec to match component spec
"""

import json
from pathlib import Path
from typing import Dict, Any, List

def flatten_questions(data: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Take a file with shared tableSpec and flatten it to per-question format
    """
    table_spec = data.get("tableSpec", {})
    questions = data.get("questions", [])
    
    # Add tableSpec to each question
    flattened = []
    for q in questions:
        q_copy = q.copy()
        # Only add if not already present
        if "tableSpec" not in q_copy:
            q_copy["tableSpec"] = table_spec
        flattened.append(q_copy)
    
    return flattened

def convert_file(filepath: str) -> int:
    """
    Convert a single file to per-question tableSpec format
    Returns: number of questions enriched
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    questions = data.get("questions", [])
    enriched = 0
    
    for q in questions:
        if "tableSpec" not in q and "tableSpec" in data:
            q["tableSpec"] = data["tableSpec"]
            enriched += 1
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    return enriched

def main():
    """Convert all table reading files"""
    base_path = Path("Test Content/Table Reading")
    json_files = [f for f in base_path.glob("*.json") if "table_component_spec" not in f.name]
    
    print(f"\n{'='*80}")
    print(f"CONVERTING {len(json_files)} FILES TO PER-QUESTION tableSpec")
    print(f"{'='*80}\n")
    
    total_converted = 0
    
    for filepath in sorted(json_files):
        print(f"Converting {filepath.name}...")
        try:
            enriched = convert_file(str(filepath))
            if enriched > 0:
                print(f"  ✅ Added tableSpec to {enriched} questions")
            else:
                print(f"  ✓ All questions already have tableSpec")
            total_converted += enriched
        except Exception as e:
            print(f"  ❌ Error: {e}")
    
    print(f"\n{'='*80}")
    print(f"CONVERSION COMPLETE")
    print(f"{'='*80}")
    print(f"Total questions enriched: {total_converted}")
    print()

if __name__ == "__main__":
    main()
