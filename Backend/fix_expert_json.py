#!/usr/bin/env python3
import json
import glob
from pathlib import Path

# Files with JSON syntax errors
files_to_fix = [
    'Test Content/Physical Science/physical_science_chemistry_basics_expert_part1.json',
    'Test Content/Physical Science/physical_science_electricity_magnetism_expert_part1.json',
    'Test Content/Physical Science/physical_science_energy_heat_expert_part1.json',
    'Test Content/Physical Science/physical_science_fluids_pressure_expert_part1.json',
    'Test Content/Physical Science/physical_science_motion_mechanics_expert_part1.json',
    'Test Content/Physical Science/physical_science_optics_waves_expert_part1.json',
]

def fix_json_file(filepath):
    """Fix JSON files by adding missing commas after closing braces of question objects."""
    with open(filepath, 'r') as f:
        content = f.read()
    
    # The issue: fastStrategy line ends with } but needs },
    # Replace: "}" (end of fastStrategy) followed by newline and spaces followed by }
    # With: "}," and remove the next line's }
    
    import re
    
    # Pattern: fastStrategy line ending with "} followed by newline/spaces and then a solo }
    # We need: "fastStrategy": "..."}  (with comma) instead of "}"
    pattern = r'("fastStrategy":\s*"[^"]*")\s*\}\s*\n\s*\}(\s*,)?'
    replacement = r'\1},'
    
    fixed = re.sub(pattern, replacement, content)
    
    if fixed != content:
        with open(filepath, 'w') as f:
            f.write(fixed)
        return True
    return False

print("Fixing JSON files...")
for filepath in files_to_fix:
    if Path(filepath).exists():
        try:
            with open(filepath) as f:
                json.load(f)
            print(f"✓ {Path(filepath).name} - already valid")
        except json.JSONDecodeError as e:
            if fix_json_file(filepath):
                try:
                    with open(filepath) as f:
                        json.load(f)
                    print(f"✓ {Path(filepath).name} - FIXED")
                except:
                    print(f"✗ {Path(filepath).name} - fix failed")
            else:
                print(f"✗ {Path(filepath).name} - could not fix")
