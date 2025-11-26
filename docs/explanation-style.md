# Explanation and FastStrategy Authoring Guide

This document provides guidance for authors creating explanations and fast strategies for AFOQT Quest math questions.

## Required Fields

Each question in the JSON files can have the following educational content fields:

| Field | Required | Description |
|-------|----------|-------------|
| `explanation` | Recommended | Full explanation of why the answer is correct |
| `fastStrategy` | Optional | Quick tip or shortcut for solving similar problems |
| `uiSpec` | Optional | Diagram specification for visual questions |

## Field Specifications

### explanation

The `explanation` field provides a complete, step-by-step explanation of how to solve the problem and why the correct answer is right.

**Format:** Plain text string (max 500 characters recommended)

**Guidelines:**
- Start with the key concept or principle being tested
- Show the mathematical steps clearly
- Explain why wrong answers are incorrect (if helpful)
- Use proper mathematical notation where appropriate
- Keep language clear and accessible

**Example:**
```json
{
  "explanation": "An acute angle is any angle that is greater than 0° but less than 90°. Since 60° is between 0° and 90°, it is acute. Right angles measure exactly 90°, obtuse angles are between 90° and 180°, straight angles are 180°, and reflex angles are greater than 180°."
}
```

### fastStrategy

The `fastStrategy` field provides a quick tip, mnemonic, or shortcut that helps test-takers solve similar problems quickly under time pressure.

**Format:** Plain text string (max 200 characters recommended)

**Guidelines:**
- Focus on speed and efficiency
- Use memorable mnemonics when possible
- Highlight pattern recognition techniques
- Provide shortcuts that work for multiple similar problems
- Keep it brief and actionable

**Example:**
```json
{
  "fastStrategy": "Memorize: acute = cute and small (< 90°), right = 90°, obtuse = big but not straight (90°–180°)."
}
```

### uiSpec

The `uiSpec` field defines a diagram to be rendered alongside the question. See the uiSpec Renderer documentation for full specification.

**Supported Types:**
- `geometry_angle_diagram` - Angles formed by rays
- `geometry_triangle_diagram` - Triangle diagrams with angle labels
- `coordinate_graph` - Coordinate plane with points and lines
- `coordinate_points` - Points plotted on coordinate plane
- `number_line` - Number line diagrams

**Example:**
```json
{
  "uiSpec": {
    "type": "geometry_angle_diagram",
    "width": 300,
    "height": 300,
    "showGrid": false,
    "lines": [
      {
        "from": { "x": 150, "y": 150 },
        "to": { "x": 150, "y": 30 },
        "label": "Ray AB"
      },
      {
        "from": { "x": 150, "y": 150 },
        "to": { "x": 260, "y": 210 },
        "label": "Ray AC"
      }
    ],
    "angleArc": {
      "center": { "x": 150, "y": 150 },
      "radius": 35,
      "startRay": 0,
      "endRay": 1,
      "label": "∠BAC",
      "measureDegrees": 60
    }
  }
}
```

## Best Practices

### For Explanations

1. **Be Complete:** Cover all aspects of the solution
2. **Be Clear:** Use simple language and avoid jargon
3. **Be Structured:** Use a logical flow from problem to solution
4. **Show Work:** Include intermediate steps
5. **Connect to Concepts:** Reference the underlying mathematical principle

### For Fast Strategies

1. **Be Memorable:** Use catchy phrases or acronyms
2. **Be Quick:** The strategy should save time, not add complexity
3. **Be Universal:** Tips should work for problem types, not just one question
4. **Be Practical:** Focus on what helps during an actual test
5. **Be Unique:** Don't repeat what's in the explanation

## Quality Checklist

Before submitting questions, verify:

- [ ] Explanation clearly states why the correct answer is right
- [ ] Explanation mentions key concepts or formulas used
- [ ] Fast strategy provides a genuinely useful shortcut
- [ ] uiSpec (if present) accurately represents the problem
- [ ] All coordinates in uiSpec are within bounds (0 to width/height)
- [ ] Labels are clear and don't overlap with diagram elements

## Missing Field Handling

The application handles missing fields gracefully:

- **Missing explanation:** Shows "Explanation pending review" placeholder
- **Missing fastStrategy:** Section is simply not displayed
- **Missing uiSpec:** No diagram is rendered (text-only question)

Authors should prioritize adding explanations to questions that lack them, as explanations are the most valuable for learning.

## Audit Reports

Use the question audit script to check for missing fields:

```bash
node tools/question_audit.js "Test Content/Math" tools/report_question_audit.json
```

This generates a report showing which questions are missing which fields, helping prioritize content updates.

## File Naming Convention

Math question files follow this naming pattern:
```
{subtopicId}_{difficulty}_part{N}.json
```

Examples:
- `geometry_basics_beginner_part1.json`
- `absolute_value_beginner_part2.json`
- `inequalities_advanced_part1.json`

## JSON Schema

Questions should follow this structure:

```json
{
  "subjectId": "math_knowledge",
  "subtopicId": "geometry_basics",
  "difficulty": "beginner",
  "part": 1,
  "questions": [
    {
      "id": "mk_geo_b_001",
      "question": "The diagram shows ∠BAC measuring 60°. How is this angle best classified?",
      "choices": {
        "A": "Right angle",
        "B": "Acute angle",
        "C": "Obtuse angle",
        "D": "Straight angle",
        "E": "Reflex angle"
      },
      "answer": "B",
      "explanation": "An acute angle is any angle that is greater than 0° but less than 90°...",
      "fastStrategy": "Memorize: acute = cute and small (< 90°)...",
      "uiSpec": { ... }
    }
  ]
}
```

## Contact

For questions about content authoring or to report issues with the explanation display, please open an issue in the repository.
