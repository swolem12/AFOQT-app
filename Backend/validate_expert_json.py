#!/usr/bin/env python3
import json
import glob
from pathlib import Path

def validate_json(filepath):
    """Validate JSON syntax."""
    try:
        with open(filepath, 'r') as f:
            json.load(f)
        return True, None
    except json.JSONDecodeError as e:
        return False, str(e)
    except Exception as e:
        return False, str(e)

# Check all expert files
expert_files = sorted(glob.glob('Test Content/Physical Science/*expert*.json'))
print(f"Found {len(expert_files)} expert files\n")

errors = []
for filepath in expert_files:
    filename = Path(filepath).name
    valid, error = validate_json(filepath)
    if valid:
        print(f"✓ {filename}")
    else:
        print(f"✗ {filename}")
        print(f"  Error: {error}\n")
        errors.append((filename, error))

print(f"\n{'='*60}")
print(f"Total: {len(expert_files)} files")
print(f"Valid: {len(expert_files) - len(errors)}")
print(f"Errors: {len(errors)}")
print(f"{'='*60}")

if errors:
    print("\nERRORS FOUND:")
    for fname, error in errors:
        print(f"  {fname}: {error}")
