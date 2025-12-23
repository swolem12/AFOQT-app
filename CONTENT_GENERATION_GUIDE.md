# AFOQT Content Generation Guide & Priority Action List

**Date**: December 21, 2025  
**Status**: Implementation Guide for Missing 55+ Content Files  
**Source Spec**: AFOQT_Master_Generation_Spec_v3.json

---

## Quick Reference: What Needs to Be Generated

Based on content analysis, here are the EXACT files needed to reach complete coverage:

### 🔴 CRITICAL - Generate These First (40+ files)

#### 1. **Arithmetic Reasoning - Advanced/Expert (8 topics × 2 difficulties = 16 files)**
```
Missing Files:
- arithmetic_algebra_word_problems_advanced_part1.json
- arithmetic_algebra_word_problems_advanced_part2.json
- arithmetic_algebra_word_problems_expert_part1.json
- arithmetic_algebra_word_problems_expert_part2.json

[Same pattern for 7 more topics: average_word_problems, basic_arithmetic, 
basic_word_problems, fractions_decimals, percent_problems, 
ratio_proportion, time_rates_work]

Each file should contain:
- 25 questions minimum
- Topics from Arithmetic Reasoning subtopic list
- C1 explanations with steps
```

#### 2. **Physical Science - Expert Part2 (7 topics × 1 file = 7 files)**
```
Missing Files:
- physical_science_chemistry_basics_expert_part2.json (25 questions, q26-q50)
- physical_science_earth_space_expert_part2.json
- physical_science_electricity_magnetism_expert_part2.json
- physical_science_energy_heat_expert_part2.json
- physical_science_fluids_pressure_expert_part2.json
- physical_science_motion_mechanics_expert_part2.json
- physical_science_optics_waves_expert_part2.json

Each file should:
- Complete the 50-question set for expert difficulty
- Build on part1 with advanced misconceptions
- Use layered constraints and abstract reasoning
```

#### 3. **Instrument Comprehension - Part2 All Difficulties (1 topic × 3 difficulties = 3 files)**
```
Missing Files:
- instrument_comprehension_beginner_part2.json (25 questions)
- instrument_comprehension_advanced_part2.json (25 questions)
- instrument_comprehension_expert_part2.json (25 questions)

Each file should:
- Include instrument panel uiSpec definitions
- Test reading combinations of attitude, heading, climb/descent
- Follow IC subskills: pitch, bank, heading combinations
```

#### 4. **Aviation Information - Part2 All Difficulties (3 files)**
```
Missing Files:
- aviation_information_beginner_part2.json (25 questions)
- aviation_information_advanced_part2.json (25 questions)
- aviation_information_expert_part2.json (25 questions)

Coverage areas:
- Basic aerodynamics fundamentals
- Aircraft controls and axes of motion
- Aircraft components and systems
- Navigation concepts
- Flight operations and procedures
```

#### 5. **Situational Judgment - Part2 All Difficulties (3 files)**
```
Missing Files:
- situational_judgment_beginner_part2.json (25 questions, scenarios)
- situational_judgment_advanced_part2.json (25 questions)
- situational_judgment_expert_part2.json (25 questions)

Scenario themes to cover:
- Chain of command decisions
- Teamwork and collaboration
- Ethics and integrity
- Conflict resolution
- Work ethic and reliability
- Respect and professionalism
```

---

### 🟠 HIGH PRIORITY - Generate These Second (13+ files)

#### 6. **Vocabulary - Missing Topics (3 topics × 3 difficulties × 2 parts = 18 files needed, have 6)**

```
Topic 1: vocabulary_analogies
Missing:
- vocabulary_analogies_beginner_part1.json
- vocabulary_analogies_beginner_part2.json
- vocabulary_analogies_advanced_part1.json
- vocabulary_analogies_advanced_part2.json
[have: expert_part1, missing: expert_part2]

Topic 2: vocabulary_synonyms
Missing:
- vocabulary_synonyms_beginner_part1.json
- vocabulary_synonyms_beginner_part2.json
- vocabulary_synonyms_advanced_part2.json
[have: advanced_part1, expert_part1, missing: expert_part2]

Topic 3: vocabulary_word_knowledge
Missing:
- vocabulary_word_knowledge_beginner_part1.json
- vocabulary_word_knowledge_beginner_part2.json
- vocabulary_word_knowledge_advanced_part1.json
- vocabulary_word_knowledge_advanced_part2.json
- vocabulary_word_knowledge_expert_part1.json
- vocabulary_word_knowledge_expert_part2.json

Each file: 25 questions minimum, follow vocabulary question structure
```

#### 7. **Block Counting - Advanced & Expert Part2 (2 files)**
```
Missing Files:
- block_counting_advanced_part2.json (25 questions)
- block_counting_expert_part2.json (25 questions)

Should:
- Include isometric block visual definitions (uiSpec)
- Test visible stack counting and hidden block inference
- Scale difficulty by block complexity and visual abstraction
```

#### 8. **Table Reading - axis_clarity Topic (5 files)**
```
Missing Files:
- table_reading_axis_clarity_beginner_part1.json
- table_reading_axis_clarity_beginner_part2.json
- table_reading_axis_clarity_advanced_part2.json (have: part1)
- table_reading_axis_clarity_expert_part1.json
- table_reading_axis_clarity_expert_part2.json

Each: 25 questions, focus on reading table axes and values
```

#### 9. **Math Knowledge - Geometry Topic (2 files)**
```
Missing Files:
- geometry_advanced_part2.json
- geometry_expert_part2.json

[have: advanced_part1, expert_part1]
Topic: Geometry concepts (shapes, angles, area, volume, etc.)
```

---

### 🟡 LOWER PRIORITY - Generate These Third (2+ files)

#### 10. **Reading Comprehension - Structural Reorganization**
```
Current Issue: Passages exist but not in part1/part2 structure

Needed:
- reading_comprehension_beginner_part1.json (passages 1-5 with 25 questions)
- reading_comprehension_beginner_part2.json (passages 6-10 with 25 questions)
- reading_comprehension_advanced_part1.json (passages 11-20 with 25 questions)
- reading_comprehension_advanced_part2.json (passages 21-30 with 25 questions)
- reading_comprehension_expert_part1.json (passages 31-45 with 25 questions)
- reading_comprehension_expert_part2.json (passages 46-60 with 25 questions)

Note: RC is special - passages + questions structure
```

---

## JSON Schema Templates for Generation

### Standard Question Template (Math, Arithmetic, Aviation, Physical Science, Vocabulary)

```json
{
  "subjectId": "subject_id",
  "subtopicId": "topic_id",
  "difficulty": "beginner|advanced|expert",
  "part": 1,
  "questions": [
    {
      "id": "subject_diff_###",
      "question": "The main question stem here.",
      "choices": {
        "A": "First option",
        "B": "Second option",
        "C": "Third option",
        "D": "Fourth option"
      },
      "answer": "C",
      "explanation": "C1-style explanation: Start by restating the question. Identify the core principle (e.g., formula, rule, concept). Walk through step-by-step reasoning. Show why C is correct. Briefly explain why A, B, D fail.",
      "steps": [
        "Step 1: Restate what we need to find",
        "Step 2: Identify the relevant formula/principle",
        "Step 3: Apply the formula with given values",
        "Step 4: Solve and verify against question requirement"
      ],
      "fastStrategy": "Short, practical test-day heuristic for solving this type of problem quickly"
    }
  ]
}
```

### Situational Judgment Template

```json
{
  "subjectId": "situational_judgment",
  "difficulty": "beginner|advanced|expert",
  "questions": [
    {
      "id": "sj_d_s##_q#",
      "scenario": "A detailed military or professional workplace scenario (2-3 sentences) describing a situation with conflict, ethics issue, or leadership question.",
      "question": "What is the BEST course of action?",
      "questionType": "single_best",
      "choices": {
        "A": "Overreactive option (violates chain of command or professionalism)",
        "B": "Best option (respects hierarchy, safety, integrity)",
        "C": "Passive option (avoids problem instead of solving it)",
        "D": "Misconception option (seems good but misses professional standard)"
      },
      "answer": "B",
      "explanation": "C1: The core issue here is [safety/integrity/teamwork/etc]. The best approach respects [chain of command/teamwork principles/professional standards] by [specific action]. This is better than A because [why A fails], better than C because [why C fails], and better than D because [why D misses the mark].",
      "themeCategory": "chain_of_command|teamwork|ethics|conflict_resolution|professionalism",
      "fastStrategy": "When in doubt, choose the option that: (1) respects chain of command, (2) prioritizes safety, (3) maintains integrity, (4) shows respect for others."
    }
  ]
}
```

### Table Reading Template

```json
{
  "subjectId": "table_reading",
  "difficulty": "beginner|advanced|expert",
  "setId": "tr_d_set##",
  "tableSpec": {
    "rows": 6,
    "columns": 5,
    "rowLabels": ["2020", "2021", "2022", "2023", "2024"],
    "columnLabels": ["Q1", "Q2", "Q3", "Q4", "Total"],
    "data": [
      [100, 120, 140, 160, 520],
      [110, 130, 150, 170, 560]
    ],
    "dataPattern": "Quarterly revenue by year with increasing trend"
  },
  "questions": [
    {
      "id": "tr_d_set##_q#",
      "question": "What is the value at row [label] and column [label]?",
      "choices": {
        "A": "Nearby wrong value",
        "B": "Correct value",
        "C": "Transposed row/column error",
        "D": "Off-by-one row/column"
      },
      "answer": "B",
      "explanation": "C1: To find the value at [row label] and [column label], locate the row [row label], then locate the column [column label], and read their intersection. The answer is [correct value]. Option A comes from looking at [adjacent cell], C from transposing rows/columns, D from adjacent cell.",
      "steps": [
        "Step 1: Locate the row labeled [row label]",
        "Step 2: Locate the column labeled [column label]",
        "Step 3: Read the intersection of that row and column",
        "Step 4: Verify using neighboring cells"
      ],
      "fastStrategy": "Row label first, then column label. Use your finger or mental line-tracing to intersection."
    }
  ]
}
```

### Instrument Comprehension Template

```json
{
  "subjectId": "instrument_comprehension",
  "difficulty": "beginner|advanced|expert",
  "setId": "ic_d_set##",
  "uiSpec": {
    "type": "instrument_panel",
    "instruments": [
      {
        "name": "attitude_indicator",
        "pitch": "15 degrees nose-up",
        "bank": "20 degrees left bank",
        "description": "Horizon bar shows aircraft nose 15° above horizon, wings tilted 20° left"
      },
      {
        "name": "heading_indicator",
        "heading": 270,
        "description": "Lubber line points to 270 (due west)"
      },
      {
        "name": "climb_descent_indicator",
        "rate": 500,
        "direction": "up",
        "description": "Needle shows 500 feet per minute climb"
      }
    ],
    "renderHints": "Draw three round gauge-style instruments with simple indicators. Use text labels for clarity."
  },
  "questions": [
    {
      "id": "ic_d_set##_q#",
      "question": "Based on these instruments, the aircraft is...",
      "choices": {
        "A": "Pitching up, turning right, descending",
        "B": "Pitching up, turning left, climbing",
        "C": "Pitching down, turning left, descending",
        "D": "Pitching down, turning right, climbing"
      },
      "answer": "B",
      "explanation": "C1: To describe aircraft attitude, we read three instruments in order: (1) Attitude indicator shows pitch and bank: nose is 15° above horizon (pitching up) and wings are tilted 20° to the left (turning left). (2) Heading indicator shows 270°, confirming westbound heading. (3) Climb/descent indicator shows +500 feet/minute (climbing). Therefore, the aircraft is climbing while turning left and pitching up. This matches option B.",
      "steps": [
        "Step 1: Read attitude indicator - determine pitch (nose up/down) and bank (left/right)",
        "Step 2: Read heading indicator - confirm direction of turn",
        "Step 3: Read climb/descent indicator - determine if climbing or descending",
        "Step 4: Combine all three readings into one aircraft attitude description"
      ],
      "fastStrategy": "Attitude indicator first (pitch and bank), heading indicator second (confirm turn direction), vertical speed indicator last (climb/descent)."
    }
  ]
}
```

---

## Generation Workflow

### For Each Missing File:

1. **Identify the parameters:**
   - Subject & subtopic
   - Difficulty level (beginner/advanced/expert)
   - Part number (1 or 2)
   - Number of questions (usually 25 per file)

2. **Determine difficulty calibration:**
   
   **Beginner:**
   - Simple, direct problems
   - 1-2 clear steps to solution
   - Obvious distractors (common arithmetic errors, misreadings)
   - Shorter passages (120-150 words for RC)
   
   **Advanced:**
   - Multi-step problems (2-4 steps)
   - Mixed concepts that require judgment
   - Plausible distractors (correct method, wrong application)
   - Medium passages (150-180 words for RC)
   
   **Expert:**
   - Complex problems (4+ steps)
   - Abstract reasoning and layered constraints
   - Strong trap answers (real misconceptions)
   - Longer passages (up to 180 words for RC)

3. **Create each question with:**
   - Unique, non-repetitive content
   - C1-style explanation (5-step format)
   - Step-by-step micro-steps
   - Fast strategy shortcut
   - 4 plausible answer choices (mix correct with common errors)

4. **Validate:**
   - JSON syntax is clean
   - Question IDs are unique
   - Answer key matches exactly one choice
   - Explanations reference the answer choice letter
   - Steps flow logically

5. **Test in app:**
   - Load subject in web app
   - Start quiz on the new topic
   - Verify questions appear
   - Check explanations display correctly

---

## Topic Subtopic Reference

### Arithmetic Reasoning Topics
- algebra_word_problems
- average_word_problems
- basic_arithmetic
- basic_word_problems
- fractions_decimals
- percent_problems
- ratio_proportion
- time_rates_work

### Physical Science Topics
- chemistry_basics
- earth_space
- electricity_magnetism
- energy_heat
- fluids_pressure
- motion_mechanics
- optics_waves

### Aviation Information Topics
- basic_aerodynamics
- aircraft_controls_and_axes
- aircraft_components_and_systems
- basic_navigation_concepts
- helicopter_basics
- flight_instruments_concepts
- flight_operations_and_procedures

### Vocabulary Topics
- vocabulary_analogies
- vocabulary_synonyms
- vocabulary_word_knowledge
- Plus 8 complete: synonyms, antonyms, confusing_word_pairs, highfreq_vocab, sentence_completion, verbal_analogies, vocabulary_in_context, word_roots_affixes

### Situational Judgment Themes
- chain_of_command
- teamwork_and_collaboration
- ethics_and_integrity
- conflict_resolution
- work_ethic_and_reliability
- respect_and_professionalism

---

## Implementation Priority

**Week 1 (CRITICAL):**
1. Generate Arithmetic advanced/expert (16 files)
2. Generate Physical Science expert part2 (7 files)
3. Generate Instrument Comprehension part2 (3 files)

**Week 2 (HIGH):**
4. Generate Aviation part2 (3 files)
5. Generate Situational Judgment part2 (3 files)
6. Generate Vocabulary missing topics (12 files)

**Week 3 (MEDIUM):**
7. Generate Block Counting advanced/expert part2 (2 files)
8. Generate Table Reading axis_clarity (5 files)
9. Generate Math geometry part2 (2 files)

**Week 4+ (NICE-TO-HAVE):**
10. Reorganize Reading Comprehension (6 files)

---

## Validation Checklist

For each file generated:
- [ ] JSON is syntactically valid (node -c)
- [ ] Has correct subjectId and subtopicId
- [ ] Has correct difficulty and part
- [ ] Contains 25 questions
- [ ] Question IDs are unique
- [ ] All questions have answer field matching a choice letter
- [ ] All explanations use C1 format
- [ ] All explanations reference the answer choice letter
- [ ] All questions have steps array with 3-4 micro-steps
- [ ] All questions have fastStrategy string
- [ ] Answers are realistic (not all A/B/C)
- [ ] Distractors are plausible (not obviously wrong)
- [ ] File naming matches convention: `[subject]_[topic]_[difficulty]_part[N].json`

---

## Quality Standards

Based on AFOQT exam standards:

1. **Questions should be:**
   - Factually accurate
   - Clear and unambiguous
   - Focused on one concept
   - Free of slang or casual language
   - Professional military tone (not condescending)

2. **Explanations should:**
   - Use C1 5-step format consistently
   - Explain WHY, not just WHAT
   - Reference the question requirement
   - Explain why other options are wrong
   - Use analogies where helpful

3. **Distractors should:**
   - Be plausible (student might choose if unsure)
   - Represent real misconceptions
   - Vary in difficulty across answer choices
   - Include at least one "almost right" option

4. **Math/Science questions should:**
   - Show units clearly
   - Use standard notation
   - Include intermediate steps if numeric
   - Reference formulas by name

---

## File Manifest - What to Generate

```
TOTAL FILES NEEDED: 57 files across all subjects

Arithmetic Reasoning:        16 files
Physical Science (expert p2): 7 files
Instrument Comprehension:     3 files
Aviation Information:         3 files
Situational Judgment:         3 files
Vocabulary (missing topics): 18 files
Block Counting:              2 files
Table Reading:               5 files
Math Geometry:               2 files
Reading Comprehension:       6 files (structural)

GRAND TOTAL: 65 files to achieve 100% complete coverage
```

Once these are generated, all subjects will have:
- ✅ Complete beginner coverage (part 1 & 2, 50 questions)
- ✅ Complete advanced coverage (part 1 & 2, 50 questions)
- ✅ Complete expert coverage (part 1 & 2, 50 questions)
- ✅ Full 150 questions per topic/difficulty progression
- ✅ Professional AFOQT-style explanations and strategies

