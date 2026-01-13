#!/usr/bin/env python3
"""
Comprehensive audit of all beginner subject files for C1 method compliance.
Checks: steps, fastStrategy, uiSpec (where applicable), explanation.
"""

import json
import glob
import os
from pathlib import Path

def audit_file(filepath, subject_name):
    """Audit a single file for C1 compliance."""
    try:
        with open(filepath, 'r') as f:
            data = json.load(f)
        
        questions = data.get('questions', [])
        if not questions:
            return {'status': 'EMPTY', 'missing': 0, 'total': 0}
        
        total = len(questions)
        missing_steps = 0
        missing_strategy = 0
        missing_explanation = 0
        has_uispec = False
        
        for q in questions:
            if 'uiSpec' in q or 'tableSpec' in q:
                has_uispec = True
            
            if not q.get('steps') or len(q['steps']) == 0:
                missing_steps += 1
            
            if not q.get('fastStrategy'):
                missing_strategy += 1
            
            if not q.get('explanation'):
                missing_explanation += 1
        
        if missing_steps > 0 or missing_strategy > 0:
            status = 'NEEDS_FIX'
        else:
            status = 'COMPLIANT'
        
        return {
            'status': status,
            'total': total,
            'missing_steps': missing_steps,
            'missing_strategy': missing_strategy,
            'missing_explanation': missing_explanation,
            'has_uispec': has_uispec
        }
    except Exception as e:
        return {'status': 'ERROR', 'error': str(e)}

def main():
    base_path = '/workspaces/AFOQT-app/Test Content'
    
    # Define all beginner subjects
    subjects = {
        'Arithmetic': f'{base_path}/Arithmetic/*beginner*.json',
        'Block Counting': f'{base_path}/Block Counting/*beginner*.json',
        'Instrument Comprehension': f'{base_path}/Instrument Comprehension/*beginner*.json',
        'Math Knowledge': f'{base_path}/Math/*beginner*.json',
        'Physical Science': f'{base_path}/Physical Science/*beginner*.json',
        'Reading Comprehension': f'{base_path}/Reading Comprehension /*beginner*.json',
        'Table Reading': f'{base_path}/Table Reading/*beginner*.json',
        'Vocabulary': f'{base_path}/Vocabulary/*beginner*.json'
    }
    
    print("=" * 80)
    print("BEGINNER SUBJECTS C1 METHOD COMPLIANCE AUDIT")
    print("=" * 80)
    
    overall_compliant = 0
    overall_needs_fix = 0
    overall_files = 0
    overall_questions = 0
    
    for subject_name, pattern in subjects.items():
        files = glob.glob(pattern)
        if not files:
            print(f"\n{subject_name}: NO FILES FOUND")
            continue
        
        print(f"\n{subject_name}: {len(files)} files")
        print("-" * 80)
        
        subject_compliant = 0
        subject_needs_fix = 0
        subject_questions = 0
        subject_missing_steps = 0
        subject_missing_strategy = 0
        
        for filepath in sorted(files):
            filename = Path(filepath).name
            result = audit_file(filepath, subject_name)
            
            if result['status'] == 'COMPLIANT':
                subject_compliant += 1
                subject_questions += result['total']
                print(f"  ✓ {filename}: {result['total']} questions - COMPLIANT")
            elif result['status'] == 'NEEDS_FIX':
                subject_needs_fix += 1
                subject_questions += result['total']
                subject_missing_steps += result['missing_steps']
                subject_missing_strategy += result['missing_strategy']
                print(f"  ⚠ {filename}: {result['total']} questions - MISSING: steps={result['missing_steps']}, strategy={result['missing_strategy']}")
            else:
                print(f"  ✗ {filename}: {result.get('status', 'UNKNOWN')}")
        
        overall_files += len(files)
        overall_compliant += subject_compliant
        overall_needs_fix += subject_needs_fix
        overall_questions += subject_questions
        
        if subject_needs_fix == 0:
            print(f"  ✓✓ {subject_name}: ALL {subject_compliant} FILES COMPLIANT ({subject_questions} questions)")
        else:
            print(f"  Summary: {subject_compliant} compliant, {subject_needs_fix} need fixes")
    
    print("\n" + "=" * 80)
    print("OVERALL SUMMARY")
    print("=" * 80)
    print(f"Total files audited: {overall_files}")
    print(f"Compliant files: {overall_compliant}")
    print(f"Files needing fixes: {overall_needs_fix}")
    print(f"Total questions: {overall_questions}")
    
    if overall_needs_fix == 0:
        print("\n🎉 ALL BEGINNER SUBJECTS ARE C1 METHOD COMPLIANT! 🎉")
    else:
        print(f"\n⚠️  {overall_needs_fix} files still need attention")

if __name__ == '__main__':
    main()
