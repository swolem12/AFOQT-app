#!/usr/bin/env python3
"""Fix rational expressions beginner files with specific steps."""

import json
import glob

def fix_rational_expressions(filepath):
    """Replace generic steps with rational expression-specific steps."""
    print(f"Fixing {filepath}...")
    with open(filepath, 'r') as f:
        data = json.load(f)
    
    fixed_count = 0
    for question in data.get('questions', []):
        q_text = question.get('question', '').lower()
        explanation = question.get('explanation', '').lower()
        old_steps = question.get('steps', [])
        
        # Check if has generic steps
        if old_steps and ("Set up the proportion" in str(old_steps) or 
                         (len(old_steps) == 3 and "Identify" in str(old_steps))):
            
            # Determine question type and assign appropriate steps
            if 'simplify' in q_text:
                if '÷' in q_text or 'divide' in q_text:
                    question['steps'] = [
                        "1. Dividing by a number means multiplying by its reciprocal.",
                        "2. For division by a whole number: divide the numerator OR multiply denominator.",
                        "3. Simplify by canceling common factors."
                    ]
                    question['fastStrategy'] = "Division → flip and multiply, or just divide the top."
                elif '×' in q_text or '*' in q_text or 'multiply' in q_text:
                    question['steps'] = [
                        "1. Multiply numerators together and denominators together.",
                        "2. Cancel common factors before multiplying (easier).",
                        "3. Simplify the resulting fraction."
                    ]
                    question['fastStrategy'] = "Cancel common factors first, then multiply straight across."
                elif '+' in q_text or 'add' in q_text:
                    question['steps'] = [
                        "1. Find common denominator (LCD of all terms).",
                        "2. Convert each fraction to equivalent form with LCD.",
                        "3. Add numerators, keep denominator, simplify."
                    ]
                    question['fastStrategy'] = "Common denominator first—then add tops only."
                elif '-' in q_text or 'subtract' in q_text:
                    question['steps'] = [
                        "1. Find common denominator (LCD of all terms).",
                        "2. Convert each fraction to equivalent form with LCD.",
                        "3. Subtract numerators, keep denominator, simplify."
                    ]
                    question['fastStrategy'] = "Common denominator first—then subtract tops only."
                else:
                    # Generic simplification
                    question['steps'] = [
                        "1. Factor numerator and denominator completely.",
                        "2. Cancel common factors that appear in both.",
                        "3. Write the simplified result."
                    ]
                    question['fastStrategy'] = "Factor everything, cancel common terms top and bottom."
            
            elif 'evaluate' in q_text or 'value' in q_text:
                question['steps'] = [
                    "1. Substitute the given value(s) into the expression.",
                    "2. Perform operations following order of operations.",
                    "3. Simplify to a single number."
                ]
                question['fastStrategy'] = "Plug in the value, then calculate using PEMDAS."
            
            elif 'equivalent' in q_text:
                question['steps'] = [
                    "1. Cross-multiply both expressions to check equality.",
                    "2. If equal, they are equivalent.",
                    "3. Or simplify both to compare."
                ]
                question['fastStrategy'] = "Cross-multiply or simplify both sides to compare."
            
            else:
                # Generic rational expression steps
                question['steps'] = [
                    "1. Identify the operation (multiply, divide, add, subtract).",
                    "2. Apply appropriate rules for rational expressions.",
                    "3. Simplify the result by factoring and canceling."
                ]
                question['fastStrategy'] = "Multiply/divide: straight across or flip. Add/subtract: common denominator."
            
            fixed_count += 1
    
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"  ✓ Fixed {fixed_count} rational expression questions")
    return fixed_count

def main():
    base_path = '/workspaces/AFOQT-app/Test Content/Math'
    files = glob.glob(f'{base_path}/rational_expressions_beginner_part*.json')
    
    total = 0
    for filepath in sorted(files):
        total += fix_rational_expressions(filepath)
    
    print(f"\n✓ TOTAL: {total} rational expression questions updated")
    
if __name__ == '__main__':
    main()
