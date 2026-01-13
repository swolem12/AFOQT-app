#!/usr/bin/env python3
"""
Redistribute questions to maintain ~25 questions per part file
Split oversized part1 files into part1, part2, part3, etc.
"""
import json
import glob
import os

QUESTIONS_PER_PART = 25

def redistribute_file(filepath):
    """Split a single file if it has > QUESTIONS_PER_PART questions"""
    with open(filepath, 'r') as f:
        data = json.load(f)
    
    questions = data.get('questions', [])
    if len(questions) <= QUESTIONS_PER_PART:
        return False  # No redistribution needed
    
    # Extract base info
    subject_id = data.get('subjectId')
    subtopic_id = data.get('subtopicId') or data.get('topicId')
    difficulty = data.get('difficulty')
    
    # Get directory and base filename
    dir_path = os.path.dirname(filepath)
    
    # Split into chunks
    parts = []
    for i in range(0, len(questions), QUESTIONS_PER_PART):
        chunk = questions[i:i+QUESTIONS_PER_PART]
        parts.append(chunk)
    
    # Write new part files
    for part_num, chunk in enumerate(parts, start=1):
        new_data = {
            'subjectId': subject_id,
            'difficulty': difficulty,
            'part': part_num,
            'questions': chunk
        }
        
        if subtopic_id:
            new_data['subtopicId'] = subtopic_id
        if data.get('topicId'):
            new_data['topicId'] = data['topicId']
        if data.get('tableSpec'):
            new_data['tableSpec'] = data['tableSpec']
        
        # Build filename
        base_name = os.path.basename(filepath).replace('_part1.json', '')
        new_filename = f'{base_name}_part{part_num}.json'
        new_path = os.path.join(dir_path, new_filename)
        
        with open(new_path, 'w') as f:
            json.dump(new_data, f, indent=2)
        
        print(f"  ✓ {new_filename}: {len(chunk)} questions")
    
    return True

def main():
    print("=" * 60)
    print("REDISTRIBUTING QUESTIONS TO ~25 PER PART FILE")
    print("=" * 60)
    
    # Process Vocabulary
    print("\n[VOCABULARY]")
    vocab_files = glob.glob('Test Content/Vocabulary/*_part1.json')
    vocab_count = 0
    for f in sorted(vocab_files):
        with open(f, 'r') as file:
            data = json.load(file)
        q_count = len(data.get('questions', []))
        if q_count > QUESTIONS_PER_PART:
            print(f"\n{os.path.basename(f)}: {q_count} questions (splitting)")
            if redistribute_file(f):
                vocab_count += 1
    
    # Process Math
    print("\n[MATH KNOWLEDGE]")
    math_files = glob.glob('Test Content/Math/*_part1.json')
    math_count = 0
    for f in sorted(math_files):
        with open(f, 'r') as file:
            data = json.load(file)
        q_count = len(data.get('questions', []))
        if q_count > QUESTIONS_PER_PART:
            print(f"\n{os.path.basename(f)}: {q_count} questions (splitting)")
            if redistribute_file(f):
                math_count += 1
    
    # Process Arithmetic (newly created, may already be split)
    print("\n[ARITHMETIC]")
    arith_files = glob.glob('Test Content/Arithmetic/*_part1.json')
    arith_count = 0
    for f in sorted(arith_files):
        with open(f, 'r') as file:
            data = json.load(file)
        q_count = len(data.get('questions', []))
        if q_count > QUESTIONS_PER_PART:
            print(f"\n{os.path.basename(f)}: {q_count} questions (splitting)")
            if redistribute_file(f):
                arith_count += 1
    
    print("\n" + "=" * 60)
    print(f"✅ REDISTRIBUTION COMPLETE")
    print(f"   Vocabulary files split: {vocab_count}")
    print(f"   Math files split: {math_count}")
    print(f"   Arithmetic files split: {arith_count}")
    print("=" * 60)

if __name__ == '__main__':
    main()
