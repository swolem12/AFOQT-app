#!/usr/bin/env python3
import json
from pathlib import Path

files_to_fix = [
    'Test Content/Physical Science/physical_science_electricity_magnetism_expert_part1.json',
    'Test Content/Physical Science/physical_science_energy_heat_expert_part1.json',
    'Test Content/Physical Science/physical_science_fluids_pressure_expert_part1.json',
    'Test Content/Physical Science/physical_science_motion_mechanics_expert_part1.json',
    'Test Content/Physical Science/physical_science_optics_waves_expert_part1.json',
]

for filepath in files_to_fix:
    with open(filepath, 'r') as f:
        lines = f.readlines()
    
    # Find and fix the structure
    # Pattern: lines ending with "} followed by next line with },
    # Solution: remove the }, lines and add comma to the "} line
    
    fixed_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # Check if this line ends with "}" (closing a question)
        if line.rstrip().endswith('"}'):
            # Add comma after the closing brace
            fixed_lines.append(line.rstrip() + ',\n')
            i += 1
            # Skip the next line if it's a solo closing brace with optional comma
            if i < len(lines) and lines[i].strip() in ['},', '}']:
                i += 1
        else:
            fixed_lines.append(line)
            i += 1
    
    # Write back
    with open(filepath, 'w') as f:
        f.writelines(fixed_lines)
    
    # Validate
    try:
        with open(filepath) as f:
            json.load(f)
        print(f"✓ {Path(filepath).name}")
    except json.JSONDecodeError as e:
        print(f"✗ {Path(filepath).name}: {e.msg} at line {e.lineno}")
