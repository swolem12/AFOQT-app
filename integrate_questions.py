#!/usr/bin/env python3
"""
Integrate generated questions into existing Test Content JSON files
"""
import json
import os
import glob

def integrate_vocabulary_questions():
    """Add generated vocabulary questions to existing files"""
    with open('generated_questions.json', 'r') as f:
        gen_data = json.load(f)
    
    vocab_gen = gen_data['vocabulary']
    test_content_dir = 'Test Content/Vocabulary'
    
    print("\n[VOCABULARY] Integrating questions...")
    
    for subtopic, difficulties in vocab_gen.items():
        for difficulty, new_questions in difficulties.items():
            # Find existing part files
            pattern = f'{test_content_dir}/{subtopic}_{difficulty}_part*.json'
            existing_files = sorted(glob.glob(pattern))
            
            if not existing_files:
                # Create new part1 file
                file_path = f'{test_content_dir}/{subtopic}_{difficulty}_part1.json'
                data = {
                    'subjectId': 'vocabulary',
                    'subtopicId': subtopic,
                    'difficulty': difficulty,
                    'part': 1,
                    'questions': new_questions[:25]  # 25 per part
                }
                with open(file_path, 'w') as f:
                    json.dump(data, f, indent=2)
                
                # Create part2 if we have more than 25
                if len(new_questions) > 25:
                    file_path = f'{test_content_dir}/{subtopic}_{difficulty}_part2.json'
                    data['part'] = 2
                    data['questions'] = new_questions[25:50]
                    with open(file_path, 'w') as f:
                        json.dump(data, f, indent=2)
                
                print(f"  ✓ Created {subtopic}_{difficulty}")
            else:
                # Load existing file and append
                file_path = existing_files[0]
                with open(file_path, 'r') as f:
                    existing_data = json.load(f)
                
                # Add new questions
                existing_data['questions'].extend(new_questions)
                
                with open(file_path, 'w') as f:
                    json.dump(existing_data, f, indent=2)
                
                print(f"  ✓ Updated {subtopic}_{difficulty} ({len(existing_data['questions'])} total)")

def integrate_math_questions():
    """Add generated math questions to existing files"""
    with open('generated_questions.json', 'r') as f:
        gen_data = json.load(f)
    
    math_gen = gen_data['math_knowledge']
    test_content_dir = 'Test Content/Math'
    
    print("\n[MATH KNOWLEDGE] Integrating questions...")
    
    for topic, difficulties in math_gen.items():
        for difficulty, new_questions in difficulties.items():
            # Map to file naming
            file_path = f'{test_content_dir}/{topic}_{difficulty}_part1.json'
            
            if os.path.exists(file_path):
                # Append to existing
                with open(file_path, 'r') as f:
                    existing_data = json.load(f)
                existing_data['questions'].extend(new_questions)
                with open(file_path, 'w') as f:
                    json.dump(existing_data, f, indent=2)
                print(f"  ✓ Updated {topic}_{difficulty} ({len(existing_data['questions'])} total)")
            else:
                # Create new
                data = {
                    'subjectId': 'math_knowledge',
                    'topicId': topic,
                    'difficulty': difficulty,
                    'part': 1,
                    'questions': new_questions
                }
                with open(file_path, 'w') as f:
                    json.dump(data, f, indent=2)
                print(f"  ✓ Created {topic}_{difficulty}")

def integrate_arithmetic_questions():
    """Add generated arithmetic questions to existing files"""
    with open('generated_questions.json', 'r') as f:
        gen_data = json.load(f)
    
    arith_gen = gen_data['arithmetic_reasoning']
    test_content_dir = 'Test Content/Arithmetic'
    
    print("\n[ARITHMETIC] Integrating questions...")
    
    for topic, difficulties in arith_gen.items():
        for difficulty, new_questions in difficulties.items():
            # Map to file naming
            file_path = f'{test_content_dir}/{topic}_{difficulty}_part1.json'
            
            if os.path.exists(file_path):
                # Append to existing
                with open(file_path, 'r') as f:
                    existing_data = json.load(f)
                existing_data['questions'].extend(new_questions)
                with open(file_path, 'w') as f:
                    json.dump(existing_data, f, indent=2)
                print(f"  ✓ Updated {topic}_{difficulty} ({len(existing_data['questions'])} total)")
            else:
                # Create new
                data = {
                    'subjectId': 'arithmetic_reasoning',
                    'topicId': topic,
                    'difficulty': difficulty,
                    'part': 1,
                    'questions': new_questions
                }
                with open(file_path, 'w') as f:
                    json.dump(data, f, indent=2)
                print(f"  ✓ Created {topic}_{difficulty}")

if __name__ == '__main__':
    print("=" * 60)
    print("INTEGRATING GENERATED QUESTIONS")
    print("=" * 60)
    
    integrate_vocabulary_questions()
    integrate_math_questions()
    integrate_arithmetic_questions()
    
    print("\n" + "=" * 60)
    print("✅ INTEGRATION COMPLETE")
    print("=" * 60)
