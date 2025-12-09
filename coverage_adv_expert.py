#!/usr/bin/env python3
"""
Coverage report for Advanced and Expert question content.
Audits all advanced and expert JSON files to report:
- Total questions by subject/subtopic/difficulty
- Missing required fields (steps, fastStrategy, explanation, answer)
- File status summary
"""

import json
import glob
import os
from pathlib import Path
from collections import defaultdict

def audit_file(filepath):
    """Audit a single file for completeness."""
    try:
        with open(filepath, 'r') as f:
            data = json.load(f)
        
        questions = data.get('questions', [])
        total = len(questions)
        
        if total == 0:
            return {
                'status': 'EMPTY',
                'total': 0,
                'questions': []
            }
        
        missing_steps = 0
        missing_strategy = 0
        missing_explanation = 0
        missing_answer = 0
        
        bad_questions = []
        
        for q in questions:
            issues = []
            
            if not q.get('steps') or (isinstance(q['steps'], list) and len(q['steps']) == 0):
                missing_steps += 1
                issues.append('steps')
            
            if not q.get('fastStrategy'):
                missing_strategy += 1
                issues.append('fastStrategy')
            
            if not q.get('explanation'):
                missing_explanation += 1
                issues.append('explanation')
            
            if not q.get('answer'):
                missing_answer += 1
                issues.append('answer')
            
            if issues:
                bad_questions.append({'id': q.get('id', 'unknown'), 'issues': issues})
        
        status = 'COMPLIANT' if (missing_steps == 0 and missing_strategy == 0 and missing_explanation == 0 and missing_answer == 0) else 'NEEDS_FIX'
        
        return {
            'status': status,
            'total': total,
            'missing_steps': missing_steps,
            'missing_strategy': missing_strategy,
            'missing_explanation': missing_explanation,
            'missing_answer': missing_answer,
            'bad_questions': bad_questions[:3]  # Show first 3 with issues
        }
    except Exception as e:
        return {'status': 'ERROR', 'error': str(e)}

def main():
    base_path = '/workspaces/AFOQT-app/Test Content'
    
    # Find all advanced and expert JSON files
    patterns = [
        f'{base_path}/**/*advanced*.json',
        f'{base_path}/**/*expert*.json'
    ]
    
    all_files = []
    for pattern in patterns:
        all_files.extend(glob.glob(pattern, recursive=True))
    
    all_files = sorted(set(all_files))
    
    print("=" * 100)
    print("ADVANCED & EXPERT COVERAGE REPORT")
    print("=" * 100)
    print()
    
    # Group by subject
    by_subject = defaultdict(lambda: {'advanced': [], 'expert': []})
    
    for filepath in all_files:
        filename = os.path.basename(filepath)
        relpath = os.path.relpath(filepath, base_path)
        subject = relpath.split('/')[0]
        
        is_expert = 'expert' in filename
        difficulty = 'expert' if is_expert else 'advanced'
        
        result = audit_file(filepath)
        result['filepath'] = filepath
        result['filename'] = filename
        
        by_subject[subject][difficulty].append(result)
    
    # Report by subject
    total_questions = 0
    total_files = 0
    total_compliant = 0
    total_needs_fix = 0
    
    for subject in sorted(by_subject.keys()):
        print(f"\n📚 {subject}")
        print("-" * 100)
        
        for difficulty in ['advanced', 'expert']:
            files = by_subject[subject][difficulty]
            if not files:
                continue
            
            print(f"  {difficulty.upper()}:")
            
            for result in files:
                total_files += 1
                status_icon = '✓' if result['status'] == 'COMPLIANT' else '✗' if result['status'] == 'ERROR' else '⚠'
                
                if result['status'] == 'COMPLIANT':
                    total_compliant += 1
                    print(f"    {status_icon} {result['filename']}: {result['total']} questions")
                    total_questions += result['total']
                
                elif result['status'] == 'NEEDS_FIX':
                    total_needs_fix += 1
                    print(f"    {status_icon} {result['filename']}: {result['total']} questions")
                    if result['missing_steps'] > 0:
                        print(f"       - Missing steps: {result['missing_steps']}")
                    if result['missing_strategy'] > 0:
                        print(f"       - Missing fastStrategy: {result['missing_strategy']}")
                    if result['missing_explanation'] > 0:
                        print(f"       - Missing explanation: {result['missing_explanation']}")
                    if result['missing_answer'] > 0:
                        print(f"       - Missing answer: {result['missing_answer']}")
                    if result['bad_questions']:
                        print(f"       Examples: {result['bad_questions'][0]['id']} (issues: {', '.join(result['bad_questions'][0]['issues'])})")
                    total_questions += result['total']
                
                elif result['status'] == 'ERROR':
                    print(f"    {status_icon} {result['filename']}: ERROR - {result['error']}")
                
                elif result['status'] == 'EMPTY':
                    print(f"    {status_icon} {result['filename']}: EMPTY (0 questions)")
    
    print()
    print("=" * 100)
    print("SUMMARY")
    print("=" * 100)
    print(f"Total Files:     {total_files}")
    print(f"Total Questions: {total_questions}")
    print(f"Compliant:       {total_compliant} files")
    print(f"Needs Fix:       {total_needs_fix} files")
    print(f"Compliance:      {int(100 * total_compliant / total_files) if total_files > 0 else 0}%")
    print()

if __name__ == '__main__':
    main()
