#!/usr/bin/env python3
"""
Table Reading Question Validator
Checks all table reading questions against the table_reading_table_component_spec.json
"""

import json
import os
import sys
from pathlib import Path
from typing import List, Dict, Any

def load_json(filepath: str) -> Dict[str, Any]:
    """Load and parse JSON file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"❌ ERROR loading {filepath}: {e}")
        return {}

def validate_table_spec(table_spec: Dict) -> List[str]:
    """Validate tableSpec structure"""
    errors = []
    
    if not isinstance(table_spec, dict):
        return ["tableSpec is not a dict"]
    
    # Check required fields
    if "type" not in table_spec:
        errors.append("Missing 'type' in tableSpec")
    elif table_spec.get("type") != "data_table":
        errors.append(f"Invalid type '{table_spec.get('type')}', expected 'data_table'")
    
    if "xHeader" not in table_spec:
        errors.append("Missing 'xHeader'")
    elif not isinstance(table_spec.get("xHeader"), list):
        errors.append("xHeader is not an array")
    
    if "yHeader" not in table_spec:
        errors.append("Missing 'yHeader'")
    elif not isinstance(table_spec.get("yHeader"), list):
        errors.append("yHeader is not an array")
    
    if "cellValues" not in table_spec:
        errors.append("Missing 'cellValues'")
    elif not isinstance(table_spec.get("cellValues"), list):
        errors.append("cellValues is not an array")
    
    # Validate cell structure
    if "cellValues" in table_spec and "yHeader" in table_spec:
        cell_values = table_spec.get("cellValues")
        y_header = table_spec.get("yHeader")
        x_header = table_spec.get("xHeader", [])
        
        if len(cell_values) != len(y_header):
            errors.append(f"cellValues has {len(cell_values)} rows but yHeader has {len(y_header)} values")
        
        for i, row in enumerate(cell_values):
            if not isinstance(row, list):
                errors.append(f"cellValues[{i}] is not an array")
            elif len(row) != len(x_header):
                errors.append(f"cellValues[{i}] has {len(row)} columns but xHeader has {len(x_header)} values")
    
    return errors

def validate_lookup(lookup: Dict, table_spec: Dict) -> List[str]:
    """Validate lookup coordinates"""
    errors = []
    
    if not isinstance(lookup, dict):
        return ["lookup is not a dict"]
    
    if "x" not in lookup and "y" not in lookup:
        errors.append("lookup missing both 'x' and 'y'")
        return errors
    
    x_val = lookup.get("x")
    y_val = lookup.get("y")
    
    if x_val is None and y_val is None:
        errors.append("lookup has null 'x' and 'y'")
        return errors
    
    # Validate against headers
    if x_val is not None:
        x_header = table_spec.get("xHeader", [])
        if x_val not in x_header:
            errors.append(f"lookup.x ({x_val}) not in xHeader {x_header}")
    
    if y_val is not None:
        y_header = table_spec.get("yHeader", [])
        if y_val not in y_header:
            errors.append(f"lookup.y ({y_val}) not in yHeader {y_header}")
    
    return errors

def validate_question(question: Dict, index: int) -> List[str]:
    """Validate a single question against spec"""
    errors = []
    
    # Check required fields
    if "id" not in question:
        errors.append(f"Question {index}: missing 'id'")
    
    if "question" not in question and "stem" not in question:
        errors.append(f"Question {index}: missing 'question' or 'stem'")
    
    if "choices" not in question:
        errors.append(f"Question {index}: missing 'choices'")
    elif not isinstance(question.get("choices"), dict):
        errors.append(f"Question {index}: choices is not a dict")
    else:
        choices = question.get("choices")
        for key in ["A", "B", "C", "D"]:
            if key not in choices:
                errors.append(f"Question {index}: missing choice '{key}'")
    
    if "answer" not in question:
        errors.append(f"Question {index}: missing 'answer'")
    elif question.get("answer") not in ["A", "B", "C", "D"]:
        errors.append(f"Question {index}: invalid answer '{question.get('answer')}'")
    
    # Check tableSpec (optional for non-lookup questions)
    if "tableSpec" in question:
        table_spec_errors = validate_table_spec(question.get("tableSpec", {}))
        errors.extend([f"Question {index}: {e}" for e in table_spec_errors])
    
    # Check lookup coordinates (can be null for non-lookup questions)
    if "lookup" not in question:
        errors.append(f"Question {index}: missing 'lookup' (fallback: parse from text)")
    elif question.get("lookup") is not None:
        # Validate lookup if it's not null (null = aggregate/non-lookup type)
        table_spec = question.get("tableSpec", {})
        lookup_errors = validate_lookup(question.get("lookup", {}), table_spec)
        errors.extend([f"Question {index}: {e}" for e in lookup_errors])
    
    return errors

def validate_file(filepath: str) -> Dict[str, Any]:
    """Validate all questions in a file"""
    data = load_json(filepath)
    
    if not data:
        return {
            "file": filepath,
            "status": "error",
            "total": 0,
            "valid": 0,
            "invalid": 0,
            "errors": ["Failed to load file"]
        }
    
    # Handle both single question and array of questions
    questions = data.get("questions", [])
    if isinstance(data.get("questions"), list):
        questions = data.get("questions")
    elif "questions" not in data and isinstance(data, dict) and "id" in data:
        # Single question format
        questions = [data]
    
    total = len(questions)
    valid = 0
    invalid = 0
    all_errors = []
    
    for i, question in enumerate(questions):
        errors = validate_question(question, i)
        if errors:
            invalid += 1
            all_errors.extend(errors)
        else:
            valid += 1
    
    return {
        "file": filepath,
        "status": "valid" if invalid == 0 else "invalid",
        "total": total,
        "valid": valid,
        "invalid": invalid,
        "errors": all_errors
    }

def main():
    """Validate all table reading files"""
    base_path = Path("Test Content/Table Reading")
    
    if not base_path.exists():
        print("❌ Table Reading folder not found")
        return 1
    
    # Find all JSON files
    json_files = list(base_path.glob("*.json"))
    json_files = [f for f in json_files if "table_component_spec" not in f.name]
    
    if not json_files:
        print("❌ No table reading question files found")
        return 1
    
    print(f"\n{'='*80}")
    print(f"VALIDATING {len(json_files)} TABLE READING FILES")
    print(f"{'='*80}\n")
    
    results = []
    total_questions = 0
    total_valid = 0
    total_invalid = 0
    
    # Validate each file
    for filepath in sorted(json_files):
        result = validate_file(str(filepath))
        results.append(result)
        total_questions += result["total"]
        total_valid += result["valid"]
        total_invalid += result["invalid"]
        
        status_icon = "✅" if result["status"] == "valid" else "❌"
        print(f"{status_icon} {filepath.name}")
        print(f"   Total: {result['total']} | Valid: {result['valid']} | Invalid: {result['invalid']}")
        
        if result["errors"]:
            for error in result["errors"][:5]:  # Show first 5 errors
                print(f"   - {error}")
            if len(result["errors"]) > 5:
                print(f"   ... and {len(result['errors']) - 5} more errors")
        print()
    
    # Summary
    print(f"{'='*80}")
    print(f"SUMMARY")
    print(f"{'='*80}")
    print(f"Total Files Checked: {len(json_files)}")
    print(f"Total Questions: {total_questions}")
    print(f"Valid Questions: {total_valid} ({100*total_valid//total_questions if total_questions > 0 else 0}%)")
    print(f"Invalid Questions: {total_invalid} ({100*total_invalid//total_questions if total_questions > 0 else 0}%)")
    print()
    
    # Detailed report
    invalid_files = [r for r in results if r["status"] == "invalid"]
    if invalid_files:
        print(f"FILES NEEDING FIXES ({len(invalid_files)}):")
        for result in invalid_files:
            print(f"\n  {result['file']} ({result['invalid']} invalid questions)")
            for error in result["errors"][:3]:
                print(f"    - {error}")
    
    return 1 if total_invalid > 0 else 0

if __name__ == "__main__":
    sys.exit(main())
