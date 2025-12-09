#!/usr/bin/env python3
import json

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
    
    # Find lines ending with '}"' (fastStrategy line closing the question)
    # and add a comma if the next line starts with '{'
    fixed_lines = []
    for i, line in enumerate(lines):
        if line.rstrip().endswith('"}'):
            # Check if next line is a question opener
            if i + 1 < len(lines) and lines[i + 1].strip().startswith('{'):
                # Replace the '}' at end with '},'
                line = line.rstrip()[:-1] + '},\n'
        fixed_lines.append(line)
    
    with open(filepath, 'w') as f:
        f.writelines(fixed_lines)
    
    print(f"✓ Fixed {filepath}")

# Verify
print("\nVerifying fixes...")
for filepath in files_to_fix:
    try:
        with open(filepath) as f:
            json.load(f)
        print(f"✓ {filepath}")
    except json.JSONDecodeError as e:
        print(f"✗ {filepath}: Line {e.lineno}, Col {e.colno}: {e.msg}")
