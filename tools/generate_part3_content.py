"""
Generate part3 question files for multiple AFOQT subjects using deterministic templates.

Subjects covered:
- Aviation Information
- Block Counting
- Instrument Comprehension
- Physical Science (all subtopics)
- Reading Comprehension (new passages 21-25 per difficulty)
- Table Reading

Each generated file contains 25 questions to align with the ~25-per-part convention.
"""

import json
import math
import random
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def ensure_dir(path: Path):
    path.mkdir(parents=True, exist_ok=True)


DIFF_CODES = {
    "beginner": "b",
    "advanced": "a",
    "expert": "e",
}


# ----------------------------------------------------------------------------
# Aviation Information
# ----------------------------------------------------------------------------


def generate_aviation_question(idx: int, difficulty: str):
    topics = [
        ("basic_aerodynamics", "lift increases with airspeed and angle of attack until stall"),
        ("aircraft_controls_and_axes", "aileron input causes roll around the longitudinal axis"),
        ("aircraft_components_and_systems", "pitot-static errors affect indicated airspeed"),
        ("basic_navigation_concepts", "VOR radials reference magnetic north"),
        ("helicopter_basics", "translational lift reduces induced drag during forward flight"),
        ("flight_instruments_concepts", "attitude indicator shows pitch and bank relative to horizon"),
        ("flight_operations_and_procedures", "stabilized approach minimizes large power changes on final")
    ]
    topic = topics[idx % len(topics)]
    diff_tone = {
        "beginner": "basic fact",
        "advanced": "multi-factor reasoning",
        "expert": "edge-case operational consideration",
    }[difficulty]
    prompt = (
        f"Which statement best reflects {diff_tone} about {topic[0].replace('_', ' ')}?"
    )
    correct = topic[1]
    distractors = [
        "Rudder primarily controls pitch in coordinated flight",
        "Ailerons change yaw by altering vertical lift on the tail",
        "Increasing bank angle always reduces load factor",
        "Transponder mode C turns off altitude reporting by default",
        "Gyroscopic instruments never experience precession",
    ]
    # rotate distractors
    picks = [correct] + distractors[idx % len(distractors): (idx % len(distractors)) + 3]
    while len(picks) < 4:
        picks.append(distractors[len(picks) - 1])
    choices_map = {k: v for k, v in zip(["A", "B", "C", "D"], picks)}
    answer_letter = [k for k, v in choices_map.items() if v == correct][0]
    return {
        "id": f"ai_{DIFF_CODES[difficulty]}_{idx:03d}",
        "question": prompt,
        "choices": choices_map,
        "answer": answer_letter,
        "explanation": f"{correct}. Other options misstate control effects or avionics behavior.",
        "steps": [
            "Identify the control or system referenced.",
            "Recall the standard aerodynamic or systems effect.",
            "Eliminate statements that conflict with fundamentals.",
        ],
        "fastStrategy": "Match the option to core aerodynamic or systems doctrine; discard claims that invert control effects.",
    }


def write_aviation_part3():
    out_dir = ROOT / "Test Content" / "Aviation"
    ensure_dir(out_dir)
    for difficulty in DIFF_CODES:
        questions = [generate_aviation_question(i + 1, difficulty) for i in range(25)]
        payload = {
            "subjectId": "aviation_information",
            "difficulty": difficulty,
            "part": 3,
            "questions": questions,
        }
        path = out_dir / f"aviation_information_{difficulty}_part3.json"
        path.write_text(json.dumps(payload, indent=2))


# ----------------------------------------------------------------------------
# Block Counting
# ----------------------------------------------------------------------------


def generate_block_layout(idx: int, difficulty: str):
    base = 6 if difficulty == "beginner" else 9 if difficulty == "advanced" else 12
    layers = 2 if difficulty == "beginner" else 3 if difficulty == "advanced" else 4
    hidden = 1 if difficulty == "beginner" else 2 if difficulty == "advanced" else 3
    total = base + layers + hidden + idx % 4
    description = (
        f"Front view shows {base//2} columns of stacked blocks at heights 2-4; side view reveals an extra hidden column; top view implies {hidden} covered blocks."
    )
    return total, description


def generate_block_counting_question(idx: int, difficulty: str):
    total_blocks, desc = generate_block_layout(idx, difficulty)
    correct = total_blocks
    choices = [correct - 1, correct + 1, correct + 2, correct]
    random.shuffle(choices)
    choices_map = {k: str(v) for k, v in zip(["A", "B", "C", "D"], choices)}
    answer_letter = [k for k, v in choices_map.items() if int(v) == correct][0]
    return {
        "id": f"bc_{DIFF_CODES[difficulty]}_set03_q{idx:02d}",
        "question": "How many blocks are in the figure?",
        "choices": choices_map,
        "answer": answer_letter,
        "explanation": f"Count visible stacks, add the hidden layer noted in the side/top views, totaling {correct} blocks.",
        "steps": [
            "Group visible columns by equal height.",
            "Add layers indicated by the side view.",
            "Include hidden blocks inferred from top coverage.",
        ],
        "fastStrategy": "Cluster columns with the same height and multiply instead of single-block counting.",
        "uiSpec": {
            "type": "isometric_blocks",
            "views": ["front", "side", "top"],
            "blockLayoutDescription": desc,
        },
    }


def write_block_counting_part3():
    out_dir = ROOT / "Test Content" / "Block Counting"
    ensure_dir(out_dir)
    for difficulty in DIFF_CODES:
        questions = [generate_block_counting_question(i + 1, difficulty) for i in range(25)]
        payload = {
            "subjectId": "block_counting",
            "difficulty": difficulty,
            "part": 3,
            "setId": f"bc_{DIFF_CODES[difficulty]}_set03",
            "questions": questions,
        }
        path = out_dir / f"block_counting_{difficulty}_part3.json"
        path.write_text(json.dumps(payload, indent=2))


# ----------------------------------------------------------------------------
# Instrument Comprehension
# ----------------------------------------------------------------------------


HEADINGS = ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"]


def generate_instrument_question(idx: int, difficulty: str):
    pitch = ["slightly nose-up", "level", "slightly nose-down", "nose-down"][(idx // 2) % 4]
    bank = ["shallow left bank", "level wings", "shallow right bank", "steep right bank"][(idx // 3) % 4]
    heading = HEADINGS[idx % len(HEADINGS)]
    vertical_speed = ["climbing", "descending", "level"][(idx) % 3]
    correct_sentence = f"The aircraft is {pitch}, {bank}, heading {heading}, and {vertical_speed}."
    distractors = [
        f"The aircraft is level pitch, level wings, heading {heading}, and {vertical_speed}.",
        f"The aircraft is {pitch}, opposite bank, heading {heading}, and {vertical_speed}.",
        f"The aircraft is {pitch}, {bank}, heading {HEADINGS[(idx+2)%len(HEADINGS)]}, and {vertical_speed}.",
    ]
    options = [correct_sentence] + distractors
    random.shuffle(options)
    choices_map = {k: v for k, v in zip(["A", "B", "C", "D"], options)}
    answer_letter = [k for k, v in choices_map.items() if v == correct_sentence][0]
    return {
        "id": f"ic_{DIFF_CODES[difficulty]}_set03_q{idx:02d}",
        "question": "Which option best describes the aircraft state shown by the instruments?",
        "choices": choices_map,
        "answer": answer_letter,
        "explanation": "Read attitude first (pitch/bank), then heading, then vertical speed to match the combined description.",
        "steps": [
            "Check attitude indicator for pitch and bank.",
            "Read heading indicator for cardinal direction.",
            "Confirm climb/descent from vertical speed.",
        ],
        "fastStrategy": "Attitude → heading → vertical speed. Prioritize attitude to eliminate options quickly.",
        "uiSpec": {
            "type": "instrument_panel",
            "instruments": [
                {"attitude_indicator": {"pitch": pitch, "bank": bank}},
                {"heading_indicator": heading},
                {"climb_descent_indicator": vertical_speed},
            ],
            "renderHints": "Simple round dials; bank tick marks; heading tape; VSI arrow up/down/level.",
        },
    }


def write_instrument_part3():
    out_dir = ROOT / "Test Content" / "Instrument Comprehension"
    ensure_dir(out_dir)
    for difficulty in DIFF_CODES:
        questions = [generate_instrument_question(i + 1, difficulty) for i in range(25)]
        payload = {
            "subjectId": "instrument_comprehension",
            "difficulty": difficulty,
            "part": 3,
            "setId": f"ic_{DIFF_CODES[difficulty]}_set03",
            "questions": questions,
        }
        path = out_dir / f"instrument_comprehension_{difficulty}_part3.json"
        path.write_text(json.dumps(payload, indent=2))


# ----------------------------------------------------------------------------
# Physical Science
# ----------------------------------------------------------------------------


PHYS_SUBTOPICS = [
    "chemistry_basics",
    "earth_space",
    "electricity_magnetism",
    "energy_heat",
    "fluids_pressure",
    "forces_motion",
    "motion_mechanics",
    "optics_waves",
]


def phys_prompt(subtopic: str):
    prompts = {
        "chemistry_basics": "Which statement about bonding or reactions is most accurate?",
        "earth_space": "Which fact about Earth or space science is correct?",
        "electricity_magnetism": "Which statement about basic circuits or fields is correct?",
        "energy_heat": "Which statement about energy or heat transfer is correct?",
        "fluids_pressure": "Which statement about fluids or pressure is correct?",
        "forces_motion": "Which statement about forces is most accurate?",
        "motion_mechanics": "Which statement about kinematics is correct?",
        "optics_waves": "Which statement about light or waves is correct?",
    }
    return prompts[subtopic]


def phys_fact(subtopic: str, variant: int):
    facts = {
        "chemistry_basics": [
            "Covalent bonds involve shared electron pairs",
            "Ionic compounds form from electron transfer and electrostatic attraction",
            "Catalysts lower activation energy without being consumed",
        ],
        "earth_space": [
            "Seasons result from Earth's axial tilt, not distance to the Sun",
            "A lunar eclipse occurs when Earth casts its shadow on the Moon",
            "Mantle convection drives plate tectonics",
        ],
        "electricity_magnetism": [
            "Voltage is electric potential difference; current is charge flow",
            "Increasing resistance lowers current for a fixed voltage (Ohm's law)",
            "Magnetic field lines emerge from north and enter south poles externally",
        ],
        "energy_heat": [
            "Conduction transfers heat through direct contact",
            "Evaporation causes cooling because higher-energy molecules leave first",
            "Specific heat is the energy to raise 1 kg by 1°C",
        ],
        "fluids_pressure": [
            "Pascal's principle transmits pressure equally in a confined fluid",
            "Bernoulli's principle links faster flow to lower static pressure",
            "Gauge pressure at depth increases linearly with fluid density and depth",
        ],
        "forces_motion": [
            "Net force equals mass times acceleration (Newton's 2nd)",
            "Action-reaction forces act on different bodies (Newton's 3rd)",
            "Balanced forces yield zero acceleration",
        ],
        "motion_mechanics": [
            "Constant velocity implies zero net force",
            "Acceleration is the rate of change of velocity",
            "Displacement depends on direction; distance does not",
        ],
        "optics_waves": [
            "Refraction bends light when speed changes between media",
            "Constructive interference increases wave amplitude",
            "Shorter wavelengths have higher frequencies for the same wave speed",
        ],
    }
    return facts[subtopic][variant % len(facts[subtopic])]


def generate_phys_question(idx: int, difficulty: str, subtopic: str):
    correct = phys_fact(subtopic, idx)
    distractor_pool = [
        "Force depends only on velocity, not acceleration",
        "All waves require a medium to travel",
        "Current remains constant regardless of resistance",
        "Heat always flows from cold to hot naturally",
        "Magnetic field lines stop at the magnet surface",
        "Seasons occur because Earth is farther from the Sun in winter",
    ]
    picks = [correct] + distractor_pool[idx % len(distractor_pool):][:3]
    while len(picks) < 4:
        picks.append(distractor_pool[len(picks)])
    random.shuffle(picks)
    choices_map = {k: v for k, v in zip(["A", "B", "C", "D"], picks)}
    answer_letter = [k for k, v in choices_map.items() if v == correct][0]
    return {
        "id": f"ps_{DIFF_CODES[difficulty]}_{idx:03d}",
        "question": phys_prompt(subtopic),
        "choices": choices_map,
        "answer": answer_letter,
        "explanation": f"{correct}. Other options contradict standard physics or chemistry principles.",
        "steps": [
            "Identify the concept (e.g., Newton's laws, bonding, refraction).",
            "Recall the governing rule or definition.",
            "Eliminate statements that violate that rule.",
        ],
        "fastStrategy": "Link each option to a known law or definition; discard statements that conflict with first principles.",
    }


def write_physical_science_part3():
    out_dir = ROOT / "Test Content" / "Physical Science"
    ensure_dir(out_dir)
    for subtopic in PHYS_SUBTOPICS:
        for difficulty in DIFF_CODES:
            questions = [generate_phys_question(i + 1, difficulty, subtopic) for i in range(25)]
            payload = {
                "subjectId": "physical_science",
                "subtopicId": subtopic,
                "difficulty": difficulty,
                "part": 3,
                "questions": questions,
            }
            path = out_dir / f"physical_science_{subtopic}_{difficulty}_part3.json"
            path.write_text(json.dumps(payload, indent=2))


# ----------------------------------------------------------------------------
# Reading Comprehension (new passages 21-25 per difficulty)
# ----------------------------------------------------------------------------


def generate_passage_text(difficulty: str, seq: int):
    base = "This passage describes a neutral analysis of technology adoption, logistics planning, and the tradeoffs leaders make under constraints."
    extra = " Advanced readers should track subtle cause-and-effect links." if difficulty != "beginner" else ""
    if difficulty == "expert":
        extra += " Expert items weave tone and implied assumptions about evidence quality."
    return (
        f"Passage {seq} for {difficulty} explores how organizations balance reliability, speed, and cost when adopting new tools. "
        f"It highlights iterative testing, feedback from operators, and the importance of redundancy in critical systems. "
        f"Leaders weigh schedule risk against training demands, noting that early wins build confidence. {base}{extra}"
    )


def rc_questions_for_passage(difficulty: str, passage_num: int):
    pid = f"rc_{DIFF_CODES[difficulty]}_p{passage_num:03d}"
    q_templates = [
        ("main_idea", "What is the main idea of the passage?", "The passage explains how organizations balance speed, reliability, and cost when adopting new tools."),
        ("detail", "According to the passage, why are early wins important?", "They build confidence among stakeholders and operators."),
        ("inference", "What can be inferred about training demands?", "They can slow schedules if not planned alongside testing."),
        ("vocabulary", "In the passage, what does 'redundancy' most nearly mean?", "Having backups to maintain operations if one element fails."),
        ("purpose", "Why does the author mention feedback from operators?", "To show practical insight improves adoption success."),
    ]
    questions = []
    for i, (focus, stem, correct) in enumerate(q_templates, 1):
        distractors = [
            "To argue that cost is irrelevant when reliability is high.",
            "To suggest training can be skipped if tools are intuitive.",
            "Because redundancy always doubles total cost.",
            "To claim speed is the only metric leaders value.",
            "Because operators resist any change regardless of support.",
        ]
        options = [correct] + distractors[i:i+3]
        while len(options) < 4:
            options.append(distractors[len(options)])
        random.shuffle(options)
        choices_map = {k: v for k, v in zip(["A", "B", "C", "D"], options)}
        answer_letter = [k for k, v in choices_map.items() if v == correct][0]
        questions.append({
            "id": f"{pid}_q{i}",
            "question": stem,
            "choices": choices_map,
            "answer": answer_letter,
            "explanation": f"{correct}",
            "keywordFocus": focus,
            "reasoningSteps": [
                "Identify the sentence(s) addressing the focus of the question.",
                "Paraphrase the relevant detail in your own words.",
                "Eliminate options that add claims not supported by the passage.",
            ],
            "fastStrategy": "Skim back to the sentence that mentions the keyword; prefer the option that restates it without distortion.",
        })
    return pid, questions


def write_reading_passages():
    out_dir = ROOT / "Test Content" / "Reading Comprehension "
    ensure_dir(out_dir)
    for difficulty in DIFF_CODES:
        for passage_num in range(21, 26):
            passage_text = generate_passage_text(difficulty, passage_num)
            pid, questions = rc_questions_for_passage(difficulty, passage_num)
            payload = {
                "subjectId": "reading_comprehension",
                "difficulty": difficulty,
                "passageId": pid,
                "passage": passage_text,
                "questions": questions,
            }
            path = out_dir / f"reading_comprehension_{difficulty}_passage{passage_num}.json"
            path.write_text(json.dumps(payload, indent=2))


# ----------------------------------------------------------------------------
# Table Reading
# ----------------------------------------------------------------------------


def generate_table_values(rows, cols, base):
    return [[base + r * 7 + c * 5 for c in range(cols)] for r in range(rows)]


def generate_table_question(idx: int, difficulty: str, x_labels, y_labels, cell_values):
    r = idx % len(y_labels)
    c = (idx * 2) % len(x_labels)
    x = x_labels[c]
    y = y_labels[r]
    value = cell_values[r][c]
    correct = str(value)
    distractors = [str(value + delta) for delta in (-3, 4, 7)]
    options = [correct] + distractors
    random.shuffle(options)
    choices_map = {k: v for k, v in zip(["A", "B", "C", "D"], options)}
    answer_letter = [k for k, v in choices_map.items() if v == correct][0]
    return {
        "id": f"tr_{DIFF_CODES[difficulty]}3_{idx:03d}",
        "question": f"What is the value at X = {x}, Y = {y}?",
        "choices": choices_map,
        "answer": answer_letter,
        "explanation": f"Locate column {x} and row {y}; the intersection shows {value}.",
        "steps": [
            "Find the column label X.",
            "Find the row label Y.",
            "Read the intersecting cell value.",
        ],
        "fastStrategy": "Column then row; trace with a finger to avoid off-by-one errors.",
        "lookup": {"x": x, "y": y},
        "tableSpec": {
            "type": "data_table",
            "xHeader": x_labels,
            "yHeader": y_labels,
            "cellValues": cell_values,
        },
    }


def write_table_reading_part3():
    out_dir = ROOT / "Test Content" / "Table Reading"
    ensure_dir(out_dir)
    for difficulty in DIFF_CODES:
        rows = 6
        cols = 6
        base = 10 if difficulty == "beginner" else 40 if difficulty == "advanced" else 80
        x_labels = list(range(1, cols + 1))
        y_labels = [10 * (i + 1) for i in range(rows)]
        cell_values = generate_table_values(rows, cols, base)
        questions = [generate_table_question(i + 1, difficulty, x_labels, y_labels, cell_values) for i in range(25)]
        payload = {
            "subjectId": "table_reading",
            "subtopicId": "table_lookup",
            "difficulty": difficulty,
            "part": 3,
            "questions": questions,
        }
        path = out_dir / f"table_reading_{difficulty}_part3.json"
        path.write_text(json.dumps(payload, indent=2))


def main():
    random.seed(7)
    write_aviation_part3()
    write_block_counting_part3()
    write_instrument_part3()
    write_physical_science_part3()
    write_reading_passages()
    write_table_reading_part3()
    print("Generated part3 content for aviation, block counting, instrument comprehension, physical science, reading comprehension, and table reading.")


if __name__ == "__main__":
    main()