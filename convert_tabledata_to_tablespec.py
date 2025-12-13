#!/usr/bin/env python3
"""
Convert tableData format (headers/rows) to tableSpec format (xHeader/yHeader/cellValues)
Used for expert-level questions with named columns
"""

import json
from pathlib import Path
from typing import Dict, Any, Optional

def tabledata_to_tablespec(table_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """
    Convert {headers: [...], rows: [[...]]} to {xHeader: [...], yHeader: [...], cellValues: [[...]]}
    
    For named columns (non-numeric), we create numeric indices
    """
    if not table_data or not isinstance(table_data, dict):
        return None
    
    headers = table_data.get("headers", [])
    rows = table_data.get("rows", [])
    
    if not headers or not rows:
        return None
    
    # Create xHeader as column indices (1, 2, 3, ...)
    x_header = list(range(1, len(headers) + 1))
    
    # Create yHeader as row indices (1, 2, 3, ...)
    y_header = list(range(1, len(rows) + 1))
    
    # Create cellValues - try to extract numeric values from cells
    cell_values = []
    for row in rows:
        row_values = []
        for cell in row:
            # Try to extract number from cell (handle percentages, currency, etc.)
            cell_str = str(cell).strip()
            
            # Remove % symbol
            if cell_str.endswith('%'):
                cell_str = cell_str[:-1].strip()
            
            # Remove $ symbol
            if cell_str.startswith('$'):
                cell_str = cell_str[1:].strip()
            
            # Try to convert to float, then to int if possible
            try:
                val = float(cell_str)
                cell_values_row_append = int(val) if val == int(val) else val
                row_values.append(cell_values_row_append)
            except (ValueError, AttributeError):
                # If it's not numeric, keep the string
                row_values.append(cell_str)
        
        cell_values.append(row_values)
    
    return {
        "type": "data_table",
        "xHeader": x_header,
        "yHeader": y_header,
        "cellValues": cell_values
    }

def enrich_file_with_tabledata(filepath: str) -> int:
    """
    Convert tableData → tableSpec for all questions in a file
    Returns: number of questions converted
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    questions = data.get("questions", [])
    converted = 0
    
    for q in questions:
        if "tableData" in q and "tableSpec" not in q:
            table_spec = tabledata_to_tablespec(q.get("tableData"))
            if table_spec:
                q["tableSpec"] = table_spec
                # Remove tableData as it's now redundant
                # del q["tableData"]  # Keep for reference
                converted += 1
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    return converted

def main():
    """Convert all files with tableData to tableSpec"""
    base_path = Path("Test Content/Table Reading")
    json_files = [f for f in base_path.glob("*.json") if "table_component_spec" not in f.name]
    
    print(f"\n{'='*80}")
    print(f"CONVERTING tableData → tableSpec FOR {len(json_files)} FILES")
    print(f"{'='*80}\n")
    
    total_converted = 0
    
    for filepath in sorted(json_files):
        print(f"Processing {filepath.name}...")
        try:
            converted = enrich_file_with_tabledata(str(filepath))
            if converted > 0:
                print(f"  ✅ Converted {converted} questions from tableData → tableSpec")
            else:
                print(f"  ✓ No tableData found or already has tableSpec")
            total_converted += converted
        except Exception as e:
            print(f"  ❌ Error: {e}")
    
    print(f"\n{'='*80}")
    print(f"CONVERSION COMPLETE")
    print(f"{'='*80}")
    print(f"Total questions converted: {total_converted}")
    print()

if __name__ == "__main__":
    main()
