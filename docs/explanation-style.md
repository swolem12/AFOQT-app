# Explanation & FastStrategy Authoring Guide

This document provides guidance for authors creating and editing question content for AFOQT Quest.

## Overview

Each question in the AFOQT Quest system can include several fields that enhance the learning experience. This guide focuses on the `explanation`, `fastStrategy`, and `steps` fields.

## Required Fields

### explanation (Required)

The `explanation` field provides a clear, educational explanation of why the correct answer is correct.

**Best Practices:**
- Keep explanations concise but complete (1-3 sentences)
- Focus on the "why" not just restating the answer
- Use mathematical notation when helpful
- Reference visual elements if a `uiSpec` is present

**Examples:**
```json
{
  "explanation": "When multiplying same bases, add exponents: 3² × 3³ = 3^(2+3) = 3⁵ = 243"
}
```

```json
{
  "explanation": "The opposite of 'benevolent' (meaning kind or generous) is 'malevolent' (meaning having or showing ill will)."
}
```

## Optional Enhanced Fields

### fastStrategy (Optional)

The `fastStrategy` field provides a quick mental shortcut or test-taking tip that helps students answer similar questions faster during timed exams.

**Best Practices:**
- Keep it to one sentence
- Focus on pattern recognition or shortcuts
- Should be memorable and practical
- Avoid just repeating the explanation

**Examples:**
```json
{
  "fastStrategy": "If the right end of the line is higher than the left end, the slope is positive. No calculation needed."
}
```

```json
{
  "fastStrategy": "For exponent multiplication with same base, just add the powers together."
}
```

### steps (Optional)

The `steps` field provides a step-by-step breakdown for solving the problem. This is especially useful for complex math problems.

**Best Practices:**
- Use numbered steps
- Each step should be a single action
- Start each step with an action verb when possible
- Keep steps concise

**Example:**
```json
{
  "steps": [
    "1. Identify the slope formula: m = (y₂ - y₁) / (x₂ - x₁)",
    "2. Substitute the coordinates: m = (3 - (-2)) / (4 - (-4))",
    "3. Simplify the numerator: 3 + 2 = 5",
    "4. Simplify the denominator: 4 + 4 = 8",
    "5. Calculate the slope: m = 5/8"
  ]
}
```

## Visual Elements (uiSpec)

### uiSpec (Optional)

The `uiSpec` field contains specifications for rendering visual diagrams. When present, the app will automatically render the specified visualization.

**Supported uiSpec types:**
- `slope_graph` - Coordinate plane with a line
- `coordinate_grid_points` - Points on a coordinate plane
- `coordinate_segment` - Line segment between two points
- `coordinate_triangle` - Triangle on coordinate plane
- `translation` - Shape translation visualization
- `rotation` - Shape rotation visualization
- `reflection` - Shape reflection visualization
- `function_table` - Input/output table
- `function_rule` - Function notation display
- `geometry_triangle` - Triangle with labeled angles/sides

**Example:**
```json
{
  "uiSpec": {
    "type": "slope_graph",
    "width": 300,
    "height": 300,
    "xRange": [-5, 5],
    "yRange": [-5, 5],
    "line": {
      "point1": { "x": -4, "y": -2 },
      "point2": { "x": 4, "y": 3 }
    },
    "showGrid": true,
    "showAxes": true
  }
}
```

## Complete Question Example

```json
{
  "id": "mk_slope_b_001",
  "question": "Based on the line shown on the coordinate plane, what type of slope does the line have?",
  "choices": {
    "A": "Positive slope",
    "B": "Negative slope",
    "C": "Zero slope",
    "D": "Undefined slope"
  },
  "answer": "A",
  "explanation": "When you read a graph from left to right, this line goes upward: the left point is lower and the right point is higher. That means as x increases, y also increases, which is exactly what a positive slope means.",
  "steps": [
    "1. Imagine tracing the line starting from the leftmost point and moving to the right.",
    "2. Notice that as you move right, you also move up on the grid.",
    "3. When y goes up as x increases, the slope is positive."
  ],
  "fastStrategy": "If the right end of the line is higher than the left end, the slope is positive. No calculation needed.",
  "uiSpec": {
    "type": "slope_graph",
    "width": 300,
    "height": 300,
    "xRange": [-5, 5],
    "yRange": [-5, 5],
    "line": {
      "point1": { "x": -4, "y": -2 },
      "point2": { "x": 4, "y": 3 }
    },
    "showGrid": true,
    "showAxes": true
  }
}
```

## Quality Checklist

Before submitting question content, verify:

- [ ] `explanation` is present and clearly explains the answer
- [ ] `fastStrategy` provides a genuine time-saving tip (if included)
- [ ] `steps` are numbered and each step is a single action (if included)
- [ ] `uiSpec` correctly describes the intended visualization (if included)
- [ ] All text is grammatically correct
- [ ] Mathematical notation is consistent
- [ ] The correct `answer` matches one of the `choices`

## Auditing Content

Use the question audit tool to check content for missing fields:

```bash
node tools/question_audit.js "Test Content/Math" "tools/report_question_audit.json"
```

This generates a report showing which questions are missing explanations, fastStrategy, uiSpec, or steps fields.

## Non-Destructive Principle

**Important:** The rendering system is designed to be non-destructive. It reads from question JSON files but never modifies them. All enhancements (diagrams, feedback panels) are rendered at runtime from the existing `uiSpec`, `explanation`, `fastStrategy`, and `steps` fields.

If a field is missing:
- `explanation`: Shows "No explanation available."
- `fastStrategy`: Section is not displayed
- `steps`: Section is not displayed
- `uiSpec`: No diagram is rendered

This ensures content files remain stable and any author additions are immediately visible in the app.
