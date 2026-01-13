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
    try:
        with open(filepath) as f:
            json.load(f)
        print(f"✓ {filepath}")
    except json.JSONDecodeError as e:
        print(f"✗ {filepath}: Line {e.lineno}, Col {e.colno}: {e.msg}")
