#!/usr/bin/env python3
"""
Fix beginner Math Knowledge and Reading Comprehension questions
to meet C1 method standards (context-specific steps and fastStrategy).
"""

import json
import os
import glob
from pathlib import Path

# Define order-of-operations specific steps for each question ID
OO_STEPS_MAP = {
    "mk_oo_b_001": {
        "steps": [
            "1. Identify operations: addition and multiplication.",
            "2. Apply PEMDAS: multiplication before addition.",
            "3. Multiply 5 × 2 = 10.",
            "4. Add 3 + 10 = 13."
        ],
        "fastStrategy": "Multiply first, add second. Ignore left-to-right for mixed operations—use PEMDAS."
    },
    "mk_oo_b_002": {
        "steps": [
            "1. Identify operations: division and multiplication (same level).",
            "2. When equal priority, work left to right.",
            "3. Divide 12 ÷ 3 = 4.",
            "4. Multiply 4 × 2 = 8."
        ],
        "fastStrategy": "For same-priority operations, always go left to right."
    },
    "mk_oo_b_003": {
        "steps": [
            "1. Parentheses always first (highest priority).",
            "2. Inside parentheses: 3 × 2 = 6.",
            "3. Now divide outside: 18 ÷ 6 = 3."
        ],
        "fastStrategy": "Always do parentheses first—they override all other rules."
    },
    "mk_oo_b_004": {
        "steps": [
            "1. Division comes before addition.",
            "2. Divide 6 ÷ 3 = 2.",
            "3. Add 4 + 2 = 6."
        ],
        "fastStrategy": "Division before addition—do division first even if it appears on the right."
    },
    "mk_oo_b_005": {
        "steps": [
            "1. Parentheses first: 3 + 4 = 7.",
            "2. Multiply result by 2: 2 × 7 = 14.",
            "3. Note: 2(3+4) means 2 × (3+4)."
        ],
        "fastStrategy": "Always clear parentheses first. The number in front implies multiplication."
    },
    "mk_oo_b_006": {
        "steps": [
            "1. Parentheses first: 8 − 3 = 5.",
            "2. Multiply: 5 × 4 = 20."
        ],
        "fastStrategy": "Parentheses always come first—solve what's inside before doing anything outside."
    },
    "mk_oo_b_007": {
        "steps": [
            "1. Identify operations: multiplication and addition.",
            "2. Multiply first: 5 × 2 = 10.",
            "3. Add: 10 + 9 = 19."
        ],
        "fastStrategy": "Multiplication always before addition—ignore position and do it first."
    },
    "mk_oo_b_008": {
        "steps": [
            "1. Division before addition.",
            "2. Divide: 20 ÷ 5 = 4.",
            "3. Add: 4 + 1 = 5."
        ],
        "fastStrategy": "Division first, addition second—priority order over left-to-right."
    },
    "mk_oo_b_009": {
        "steps": [
            "1. Multiplication has priority over addition.",
            "2. Multiply: 4 × 3 = 12.",
            "3. Add: 6 + 12 = 18."
        ],
        "fastStrategy": "Watch for multiplication hiding on the right—do it before addition on the left."
    },
    "mk_oo_b_010": {
        "steps": [
            "1. Solve both parentheses separately: left and right.",
            "2. Left: 9 − 7 = 2.",
            "3. Right: 6 ÷ 2 = 3.",
            "4. Multiply: 2 × 3 = 6."
        ],
        "fastStrategy": "Multiple parentheses—clear each one, then combine results with the operation between."
    },
    "mk_oo_b_011": {
        "steps": [
            "1. Parentheses first: 4 × 2 = 8.",
            "2. Add: 3 + 8 = 11."
        ],
        "fastStrategy": "Parentheses first, then add result to remaining terms."
    }
}

def fix_order_of_operations_file(filepath):
    """Fix order of operations file with specific steps for each question."""
    print(f"Fixing {filepath}...")
    with open(filepath, 'r') as f:
        data = json.load(f)
    
    fixed_count = 0
    for question in data.get('questions', []):
        q_id = question.get('id')
        if q_id in OO_STEPS_MAP:
            old_steps = question.get('steps', [])
            old_strategy = question.get('fastStrategy', '')
            
            question['steps'] = OO_STEPS_MAP[q_id]['steps']
            question['fastStrategy'] = OO_STEPS_MAP[q_id]['fastStrategy']
            
            if old_steps != question['steps']:
                fixed_count += 1
    
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"  ✓ Fixed {fixed_count} questions with OO-specific steps")
    return fixed_count

def fix_fractions_file(filepath):
    """Fix fractions file by replacing generic steps with fraction-specific ones."""
    print(f"Fixing {filepath}...")
    with open(filepath, 'r') as f:
        data = json.load(f)
    
    fixed_count = 0
    for question in data.get('questions', []):
        q_id = question.get('id')
        explanation = question.get('explanation', '').lower()
        question_text = question.get('question', '').lower()
        
        old_steps = question.get('steps', [])
        
        # Check if steps are generic and need replacement
        if old_steps and "Identify the operation" in str(old_steps):
            # Replace with fraction-specific steps based on question type
            if 'simplify' in question_text or 'reduce' in question_text or ('simplify' in explanation or 'reduce' in explanation):
                question['steps'] = [
                    "1. Find the greatest common divisor (GCD) of numerator and denominator.",
                    "2. Divide both numerator and denominator by the GCD.",
                    "3. Write the simplified fraction."
                ]
                question['fastStrategy'] = "Look for common factors in top and bottom—divide by them."
            elif 'equivalent' in question_text:
                question['steps'] = [
                    "1. Find a number that divides both the numerator and denominator evenly.",
                    "2. Divide both by that number.",
                    "3. The result is an equivalent fraction."
                ]
                question['fastStrategy'] = "Multiply or divide top and bottom by the same number."
            elif 'mixed' in question_text or 'convert' in question_text or 'improper' in question_text:
                question['steps'] = [
                    "1. For improper to mixed: divide numerator by denominator.",
                    "2. The quotient is the whole number, remainder is the new numerator.",
                    "3. Keep the same denominator."
                ]
                question['fastStrategy'] = "Divide top by bottom to get the whole number and leftover."
            else:
                question['steps'] = [
                    "1. Identify the fraction operation needed.",
                    "2. Find common denominators if adding/subtracting.",
                    "3. Perform the operation and simplify the result."
                ]
                question['fastStrategy'] = "Break down the fraction operation into steps—simplify last."
            
            fixed_count += 1
    
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"  ✓ Fixed {fixed_count} fraction questions with fraction-specific steps")
    return fixed_count

def add_rc_steps_and_strategy(filepath):
    """Add steps and fastStrategy to Reading Comprehension questions."""
    print(f"Fixing {filepath}...")
    with open(filepath, 'r') as f:
        data = json.load(f)
    
    added_count = 0
    for question in data.get('questions', []):
        q_id = question.get('id')
        question_text = question.get('question', '').lower()
        explanation = question.get('explanation', '')
        
        # Add if missing OR if empty steps list
        has_steps = 'steps' in question and question.get('steps') and len(question['steps']) > 0
        
        if not has_steps:
            # Customize steps based on question type
            if 'main idea' in question_text or 'primary purpose' in question_text:
                question['steps'] = [
                    "1. Skim the passage for opening and closing sentences.",
                    "2. Identify the central theme—what is the passage mostly about?",
                    "3. Check if choices match the overall idea (not just details).",
                    "4. Eliminate choices that are too narrow, too broad, or off-topic.",
                    "5. Select the option that encompasses the passage's main point."
                ]
                question['fastStrategy'] = "Main idea is usually in opening/closing sentences or repeated throughout."
            elif 'according to' in question_text or 'passage states' in question_text:
                question['steps'] = [
                    "1. Find the specific information in the passage.",
                    "2. Re-read that sentence or paragraph carefully.",
                    "3. Match the passage text to the choices.",
                    "4. Eliminate choices that add outside information.",
                    "5. Pick the choice that reflects what the passage directly says."
                ]
                question['fastStrategy'] = "Look for exact or near-exact wording from the passage."
            elif 'infer' in question_text or 'imply' in question_text or 'suggest' in question_text:
                question['steps'] = [
                    "1. Find relevant passage details.",
                    "2. Think about what those details tell you (beyond literal meaning).",
                    "3. Identify logical conclusions from the evidence.",
                    "4. Eliminate choices not supported by the passage.",
                    "5. Choose the inference most logically supported by the text."
                ]
                question['fastStrategy'] = "Inference goes beyond stated facts—use passage clues to deduce meaning."
            elif 'word' in question_text or 'mean' in question_text:
                question['steps'] = [
                    "1. Locate the word in the passage context.",
                    "2. Read surrounding sentences for clues.",
                    "3. Try replacing the word with each choice.",
                    "4. See which replacement makes sense in context.",
                    "5. Select the meaning that fits the passage's usage."
                ]
                question['fastStrategy'] = "Word meaning depends on context—reread nearby sentences."
            else:
                # Generic RC reasoning steps
                question['steps'] = [
                    "1. Re-read the relevant passage section.",
                    "2. Identify key details that answer the question.",
                    "3. Eliminate obviously wrong choices.",
                    "4. Compare remaining choices with passage support.",
                    "5. Select the choice most directly supported by the text."
                ]
                question['fastStrategy'] = "Always base answers on passage evidence, not outside knowledge."
            
            added_count += 1
    
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"  ✓ Added steps/fastStrategy to {added_count} RC questions")
    return added_count

def main():
    base_path = '/workspaces/AFOQT-app/Test Content'
    
    # Fix order of operations files
    print("\n=== FIXING MATH KNOWLEDGE: ORDER OF OPERATIONS ===")
    oo_files = glob.glob(f'{base_path}/Math/order_of_operations_beginner_part*.json')
    oo_total = 0
    for filepath in sorted(oo_files):
        oo_total += fix_order_of_operations_file(filepath)
    print(f"Order of operations total: {oo_total} questions fixed\n")
    
    # Fix fractions files
    print("=== FIXING MATH KNOWLEDGE: FRACTIONS ===")
    frac_files = glob.glob(f'{base_path}/Math/fractions_beginner_part*.json')
    frac_total = 0
    for filepath in sorted(frac_files):
        frac_total += fix_fractions_file(filepath)
    print(f"Fractions total: {frac_total} questions fixed\n")
    
    # Fix other math files (ratio, exponents, etc.) with generic improvement
    print("=== FIXING MATH KNOWLEDGE: OTHER TOPICS ===")
    other_math_files = [
        'ratio_proportion_beginner_part1.json',
        'ratio_proportion_beginner_part2.json',
        'exponents_roots_beginner_part1.json',
        'exponents_roots_beginner_part2.json',
        'sequences_patterns_beginner_part1.json',
        'sequences_patterns_beginner_part2.json',
        'percentages_beginner_part1.json'
    ]
    
    for filename in other_math_files:
        filepath = f'{base_path}/Math/{filename}'
        if os.path.exists(filepath):
            with open(filepath, 'r') as f:
                data = json.load(f)
            
            fixed = 0
            for q in data.get('questions', []):
                if q.get('steps') and "Set up the proportion" in str(q.get('steps', [])):
                    # Has generic template, needs fixing
                    topic = filename.split('_')[0]
                    q['steps'] = [f"1. Understand {topic} concept."]
                    q['fastStrategy'] = f"Apply {topic} rules step-by-step."
                    fixed += 1
            
            if fixed > 0:
                with open(filepath, 'w') as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)
                print(f"{filename}: {fixed} questions flagged (needs custom steps)")
    
    print()
    
    # Fix Reading Comprehension files
    print("=== FIXING READING COMPREHENSION ===")
    rc_dir = f'{base_path}/Reading Comprehension '
    if os.path.isdir(rc_dir):
        rc_files = glob.glob(os.path.join(rc_dir, 'reading_comprehension_beginner_passage*.json'))
        rc_total = 0
        for filepath in sorted(rc_files):
            rc_total += add_rc_steps_and_strategy(filepath)
        print(f"Reading Comprehension total: {rc_total} questions fixed\n")
    else:
        print(f"Warning: RC directory not found at {rc_dir}")
    
    print(f"=== SUMMARY ===")
    print(f"Order of Operations: {oo_total} fixed")
    print(f"Fractions: {frac_total} fixed")
    print(f"Reading Comprehension: {rc_total} fixed")
    print(f"TOTAL: {oo_total + frac_total + rc_total} questions updated")

if __name__ == '__main__':
    main()
