#!/usr/bin/env python3
"""
Table Reading Question Enricher
Adds missing 'lookup' coordinates by parsing question text
"""

import json
import re
from pathlib import Path
from typing import Dict, Any, Optional, Tuple

def extract_coordinates(text: str) -> Optional[Tuple[Optional[int], Optional[int]]]:
    """
    Extract X and Y coordinates from question text
    Examples: "X = 2 and Y = 20", "X=3, Y=10", "where X = 1 and Y = 10?"
    Returns: (x, y) or (None, None)
    """
    x_match = re.search(r'X\s*=\s*(\d+)', text, re.IGNORECASE)
    y_match = re.search(r'Y\s*=\s*(\d+)', text, re.IGNORECASE)
    
    x = int(x_match.group(1)) if x_match else None
    y = int(y_match.group(1)) if y_match else None
    
    return (x, y)

def enrich_question(question: Dict[str, Any], table_spec: Dict[str, Any]) -> Dict[str, Any]:
    """
    Add 'lookup' coordinates to a question if missing
    """
    if "lookup" in question:
        return question  # Already has lookup
    
    # Extract from question text
    question_text = question.get("question", "")
    x, y = extract_coordinates(question_text)
    
    if x is not None and y is not None:
        question["lookup"] = {"x": x, "y": y}
        return question
    
    # Fallback: try to infer from answer + stepmsg
    if x is None and y is None:
        print(f"  ⚠️  Could not extract coordinates from: {question.get('id', 'unknown')}")
        print(f"      Question: {question_text[:60]}...")
    
    return question

def enrich_file(filepath: str) -> Dict[str, Any]:
    """
    Enrich all questions in a file with lookup coordinates
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    table_spec = data.get("tableSpec", {})
    questions = data.get("questions", [])
    
    enriched_count = 0
    for question in questions:
        if "lookup" not in question:
            enrich_question(question, table_spec)
            enriched_count += 1
    
    return data, enriched_count

def main():
    """Enrich all table reading files"""
    base_path = Path("Test Content/Table Reading")
    json_files = [f for f in base_path.glob("*.json") if "table_component_spec" not in f.name]
    
    print(f"\n{'='*80}")
    print(f"ENRICHING {len(json_files)} TABLE READING FILES")
    print(f"{'='*80}\n")
    
    total_enriched = 0
    
    for filepath in sorted(json_files):
        print(f"Processing {filepath.name}...")
        
        try:
            data, enriched = enrich_file(str(filepath))
            total_enriched += enriched
            
            if enriched > 0:
                # Write back enriched data
                with open(filepath, 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)
                print(f"  ✅ Added lookup to {enriched} questions")
            else:
                print(f"  ✓ All {len(data.get('questions', []))} questions already have lookup")
        except Exception as e:
            print(f"  ❌ Error: {e}")
    
    print(f"\n{'='*80}")
    print(f"ENRICHMENT COMPLETE")
    print(f"{'='*80}")
    print(f"Total lookup coordinates added: {total_enriched}")
    print()

if __name__ == "__main__":
    main()
