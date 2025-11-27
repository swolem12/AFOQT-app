#!/usr/bin/env node
/**
 * Question Content Enrichment Tool
 * 
 * Adds missing 'steps' and 'fastStrategy' fields to math questions
 * following the C1 tutoring method:
 * - explanation: Clear, plain-English concept + worked solution
 * - steps: Numbered procedural breakdown for rusty learners
 * - fastStrategy: One-line test-speed shortcut
 * 
 * Usage: node tools/enrich_questions.js "Test Content/Math" [--dry-run]
 */

const fs = require('fs');
const path = require('path');

// Topic-specific fast strategies
const FAST_STRATEGIES = {
    'absolute_value': 'For |x - a| = b, split into two cases: x - a = b or x - a = -b.',
    'coordinate_geometry': 'Distance = √[(x₂-x₁)² + (y₂-y₁)²]; Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2).',
    'distributive_foil': 'FOIL = First, Outer, Inner, Last. Distribute each term to every other term.',
    'evaluate_expressions': 'Substitute the given values carefully, then follow order of operations (PEMDAS).',
    'exponents_roots': 'Memorize: xᵃ · xᵇ = xᵃ⁺ᵇ; (xᵃ)ᵇ = xᵃᵇ; x⁰ = 1; √x = x^(1/2).',
    'factoring': 'Look for common factors first, then try factoring patterns (difference of squares, trinomials).',
    'fractions': 'Find common denominators for add/subtract; multiply straight across; flip and multiply for division.',
    'function_evaluation': 'Replace every x in f(x) with the given input value, then simplify.',
    'functions': 'f(a) means plug a into the function wherever you see x.',
    'geometry_basics': 'Memorize key formulas: Area of rectangle = l×w; Triangle = ½bh; Circle = πr².',
    'graph_interpretation': 'Read axes labels first, then find the point or trend the question asks about.',
    'graphing_linear_functions': 'y = mx + b: m is slope (rise/run), b is y-intercept (where line crosses y-axis).',
    'inequalities': 'Solve like equations, but flip the inequality sign when multiplying/dividing by a negative.',
    'linear_equations': 'Isolate the variable: undo operations in reverse order (addition/subtraction first, then multiplication/division).',
    'number_classification': 'Integers = whole numbers (positive, negative, zero); Rationals = fractions; Irrationals = non-repeating decimals like √2, π.',
    'order_of_operations': 'PEMDAS: Parentheses, Exponents, Multiply/Divide (left to right), Add/Subtract (left to right).',
    'polygons_and_angles': 'Interior angles sum = (n-2)×180°. Triangle = 180°, Quadrilateral = 360°.',
    'polynomials': 'Combine like terms only (same variable and exponent). Watch your signs!',
    'probability': 'Probability = favorable outcomes ÷ total outcomes. Always between 0 and 1.',
    'quadratic_equations': 'Try factoring first; if stuck, use quadratic formula: x = (-b ± √(b²-4ac)) / 2a.',
    'radicals': 'Simplify by finding perfect square factors: √50 = √25·√2 = 5√2.',
    'ratio_proportion': 'Cross-multiply to solve proportions: if a/b = c/d, then ad = bc.',
    'rational_expressions': 'Factor numerator and denominator, then cancel common factors.',
    'sequences': 'Arithmetic: add constant (aₙ = a₁ + (n-1)d). Geometric: multiply constant (aₙ = a₁ · rⁿ⁻¹).',
    'slope': 'Slope = rise/run = (y₂-y₁)/(x₂-x₁). Positive = uphill, Negative = downhill, Zero = flat.',
    'statistics': 'Mean = sum ÷ count; Median = middle value; Range = max - min.',
    'systems_linear': 'Substitution or elimination. Pick the method that avoids fractions.',
    'transformations': 'Reflection flips, Rotation turns, Translation slides. Track one point through the transformation.',
    'word_problems_equation_setup': 'Identify unknowns, translate words to math symbols, set up the equation before solving.'
};

// Generate steps from explanation
function generateSteps(question, subtopic) {
    const explanation = question.explanation || '';
    const questionText = question.question || '';
    
    // Extract key numbers and operations from explanation
    const steps = [];
    
    // Generic step patterns based on subtopic
    if (subtopic.includes('slope')) {
        steps.push('1. Identify the two points or the equation given.');
        steps.push('2. Use the slope formula: m = (y₂ - y₁) / (x₂ - x₁).');
        steps.push('3. Substitute the values and simplify.');
    } else if (subtopic.includes('coordinate') || subtopic.includes('distance') || subtopic.includes('midpoint')) {
        steps.push('1. Identify the coordinates of the points.');
        steps.push('2. Apply the appropriate formula (distance or midpoint).');
        steps.push('3. Calculate step by step, simplifying as you go.');
    } else if (subtopic.includes('polygon') || subtopic.includes('angle')) {
        steps.push('1. Identify the type of polygon or angle relationship.');
        steps.push('2. Recall the relevant formula or rule (e.g., triangle sum = 180°).');
        steps.push('3. Set up and solve the equation.');
    } else if (subtopic.includes('equation') || subtopic.includes('linear')) {
        steps.push('1. Identify what you\'re solving for.');
        steps.push('2. Isolate the variable using inverse operations.');
        steps.push('3. Simplify and check your answer.');
    } else if (subtopic.includes('fraction')) {
        steps.push('1. Identify the operation (add, subtract, multiply, divide).');
        steps.push('2. Find common denominators if adding/subtracting.');
        steps.push('3. Perform the operation and simplify.');
    } else if (subtopic.includes('exponent') || subtopic.includes('root')) {
        steps.push('1. Identify which exponent rule applies.');
        steps.push('2. Apply the rule to simplify.');
        steps.push('3. Calculate the final value.');
    } else if (subtopic.includes('function')) {
        steps.push('1. Identify the input value to substitute.');
        steps.push('2. Replace x with the given value in the function.');
        steps.push('3. Simplify using order of operations.');
    } else if (subtopic.includes('probability')) {
        steps.push('1. Count the favorable outcomes.');
        steps.push('2. Count the total possible outcomes.');
        steps.push('3. Divide: P = favorable / total.');
    } else if (subtopic.includes('statistic') || subtopic.includes('mean') || subtopic.includes('median')) {
        steps.push('1. Arrange data in order if needed.');
        steps.push('2. Apply the appropriate formula (mean, median, or range).');
        steps.push('3. Calculate and simplify.');
    } else if (subtopic.includes('factor')) {
        steps.push('1. Look for the greatest common factor (GCF).');
        steps.push('2. Check for special patterns (difference of squares, perfect square trinomial).');
        steps.push('3. Factor completely and verify by multiplying back.');
    } else if (subtopic.includes('quadratic')) {
        steps.push('1. Write the equation in standard form (ax² + bx + c = 0).');
        steps.push('2. Try factoring, or use the quadratic formula.');
        steps.push('3. Solve for x and check both solutions.');
    } else if (subtopic.includes('inequalit')) {
        steps.push('1. Solve as you would an equation.');
        steps.push('2. Remember: flip the sign when multiplying/dividing by a negative.');
        steps.push('3. Express the solution as an inequality or interval.');
    } else if (subtopic.includes('ratio') || subtopic.includes('proportion')) {
        steps.push('1. Set up the proportion with equal ratios.');
        steps.push('2. Cross-multiply to create an equation.');
        steps.push('3. Solve for the unknown.');
    } else if (subtopic.includes('sequence')) {
        steps.push('1. Identify if arithmetic (constant difference) or geometric (constant ratio).');
        steps.push('2. Find the common difference or ratio.');
        steps.push('3. Apply the formula to find the requested term.');
    } else if (subtopic.includes('system')) {
        steps.push('1. Choose substitution or elimination method.');
        steps.push('2. Solve for one variable first.');
        steps.push('3. Substitute back to find the other variable.');
    } else if (subtopic.includes('transform')) {
        steps.push('1. Identify the transformation type (reflection, rotation, translation).');
        steps.push('2. Apply the transformation rule to each point.');
        steps.push('3. Plot or describe the new position.');
    } else if (subtopic.includes('word_problem')) {
        steps.push('1. Read carefully and identify the unknown.');
        steps.push('2. Translate the words into a mathematical expression or equation.');
        steps.push('3. Solve the equation and answer the original question.');
    } else {
        // Generic steps
        steps.push('1. Read the problem and identify what\'s being asked.');
        steps.push('2. Write down the relevant formula or rule.');
        steps.push('3. Substitute values and solve step by step.');
        steps.push('4. Check your answer against the choices.');
    }
    
    return steps;
}

// Get fast strategy for subtopic
function getFastStrategy(subtopic) {
    // Try to match subtopic to our strategies
    for (const [key, strategy] of Object.entries(FAST_STRATEGIES)) {
        if (subtopic.toLowerCase().includes(key.replace(/_/g, '')) || 
            subtopic.toLowerCase().includes(key.replace(/_/g, ' '))) {
            return strategy;
        }
    }
    
    // Try partial matches
    const subtopicLower = subtopic.toLowerCase();
    if (subtopicLower.includes('slope')) return FAST_STRATEGIES['slope'];
    if (subtopicLower.includes('angle') || subtopicLower.includes('polygon')) return FAST_STRATEGIES['polygons_and_angles'];
    if (subtopicLower.includes('fraction')) return FAST_STRATEGIES['fractions'];
    if (subtopicLower.includes('equation')) return FAST_STRATEGIES['linear_equations'];
    if (subtopicLower.includes('function')) return FAST_STRATEGIES['functions'];
    if (subtopicLower.includes('exponent')) return FAST_STRATEGIES['exponents_roots'];
    if (subtopicLower.includes('factor')) return FAST_STRATEGIES['factoring'];
    if (subtopicLower.includes('probability')) return FAST_STRATEGIES['probability'];
    if (subtopicLower.includes('geometry')) return FAST_STRATEGIES['geometry_basics'];
    if (subtopicLower.includes('graph')) return FAST_STRATEGIES['graphing_linear_functions'];
    if (subtopicLower.includes('coordinate')) return FAST_STRATEGIES['coordinate_geometry'];
    
    // Default
    return 'Focus on the core pattern and apply the simplest rule to get the answer quickly.';
}

// Process a single JSON file
function processFile(filePath, dryRun = false) {
    const fileName = path.basename(filePath);
    let modified = false;
    let stepsAdded = 0;
    let fastStrategyAdded = 0;
    
    try {
        const raw = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(raw);
        
        if (!data.questions || !Array.isArray(data.questions)) {
            return { modified: false, stepsAdded: 0, fastStrategyAdded: 0 };
        }
        
        const subtopic = data.subtopicId || fileName.replace(/_beginner.*|_advanced.*|_expert.*/, '');
        
        data.questions = data.questions.map(q => {
            // Add steps if missing
            if (!q.steps || !Array.isArray(q.steps) || q.steps.length === 0) {
                q.steps = generateSteps(q, subtopic);
                stepsAdded++;
                modified = true;
            }
            
            // Add fastStrategy if missing
            if (!q.fastStrategy || q.fastStrategy.trim() === '') {
                q.fastStrategy = getFastStrategy(subtopic);
                fastStrategyAdded++;
                modified = true;
            }
            
            return q;
        });
        
        if (modified && !dryRun) {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
        }
        
        return { modified, stepsAdded, fastStrategyAdded };
    } catch (err) {
        console.error(`  ✗ Error processing ${fileName}: ${err.message}`);
        return { modified: false, stepsAdded: 0, fastStrategyAdded: 0, error: err.message };
    }
}

// Main function
function main() {
    const args = process.argv.slice(2);
    
    if (args.length < 1) {
        console.log('Usage: node tools/enrich_questions.js <directory> [--dry-run]');
        console.log('');
        console.log('Adds missing steps and fastStrategy fields to math question JSONs.');
        console.log('');
        console.log('Options:');
        console.log('  --dry-run    Preview changes without modifying files');
        process.exit(1);
    }
    
    const inputDir = args[0];
    const dryRun = args.includes('--dry-run');
    
    if (!fs.existsSync(inputDir)) {
        console.error(`Error: Directory not found: ${inputDir}`);
        process.exit(1);
    }
    
    console.log(`\n🔧 Question Content Enrichment Tool`);
    console.log(`   Directory: ${inputDir}`);
    console.log(`   Mode: ${dryRun ? 'DRY RUN (no changes)' : 'LIVE (will modify files)'}`);
    console.log('');
    
    const files = fs.readdirSync(inputDir)
        .filter(f => f.endsWith('.json') && !f.includes('schema') && !f.includes('index'));
    
    let totalModified = 0;
    let totalStepsAdded = 0;
    let totalFastStrategyAdded = 0;
    let errors = 0;
    
    for (const file of files) {
        const filePath = path.join(inputDir, file);
        const result = processFile(filePath, dryRun);
        
        if (result.error) {
            errors++;
        } else if (result.modified) {
            totalModified++;
            totalStepsAdded += result.stepsAdded;
            totalFastStrategyAdded += result.fastStrategyAdded;
            console.log(`  ✓ ${file}: +${result.stepsAdded} steps, +${result.fastStrategyAdded} fastStrategy`);
        }
    }
    
    console.log('');
    console.log('📈 Summary:');
    console.log(`   Files processed: ${files.length}`);
    console.log(`   Files modified: ${totalModified}`);
    console.log(`   Steps added: ${totalStepsAdded}`);
    console.log(`   FastStrategy added: ${totalFastStrategyAdded}`);
    if (errors > 0) {
        console.log(`   Errors: ${errors}`);
    }
    
    if (dryRun) {
        console.log('');
        console.log('💡 This was a dry run. Run without --dry-run to apply changes.');
    }
}

main();
