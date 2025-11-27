#!/usr/bin/env node
/**
 * Add uiSpec to Visual Math Questions
 * 
 * Automatically generates uiSpec diagrams for math questions in topics that benefit
 * from visual representations (slope, geometry, transformations, etc.)
 * 
 * Usage: node tools/add_uispecs.js "Test Content/Math" [--dry-run]
 */

const fs = require('fs');
const path = require('path');

// Topics that should have uiSpec diagrams
const VISUAL_TOPICS = {
    'slope': { type: 'slope_graph', match: /slope|rise.*run|steepest|line.*graph/i },
    'coordinate_geometry': { type: 'coordinate_slope', match: /distance|midpoint|coordinate|point.*\(.*\)/i },
    'geometry_basics': { type: 'geometry_triangle_diagram', match: /triangle|angle|perimeter|area|rectangle|square|circle/i },
    'polygons_and_angles': { type: 'polygon_basic', match: /polygon|pentagon|hexagon|octagon|interior.*angle|exterior.*angle/i },
    'transformations': { type: 'coordinate_grid_points', match: /reflect|rotate|translate|transform|image.*point/i },
    'graphing_linear': { type: 'slope_graph', match: /graph.*line|y\s*=\s*mx|slope.*intercept/i }
};

// Generate slope graph uiSpec
function generateSlopeGraph(question, answer) {
    // Try to extract points from question
    const pointMatch = question.match(/\((-?\d+),\s*(-?\d+)\).*\((-?\d+),\s*(-?\d+)\)/);
    let point1, point2;
    
    if (pointMatch) {
        point1 = { x: parseInt(pointMatch[1]), y: parseInt(pointMatch[2]) };
        point2 = { x: parseInt(pointMatch[3]), y: parseInt(pointMatch[4]) };
    } else {
        // Generate random points based on question type
        const isPositive = question.toLowerCase().includes('positive') || 
                          answer.toLowerCase().includes('positive');
        const isNegative = question.toLowerCase().includes('negative') || 
                          answer.toLowerCase().includes('negative');
        const isZero = question.toLowerCase().includes('zero') || 
                      question.toLowerCase().includes('horizontal');
        const isUndefined = question.toLowerCase().includes('undefined') || 
                           question.toLowerCase().includes('vertical');
        
        if (isZero) {
            point1 = { x: -3, y: 2 };
            point2 = { x: 3, y: 2 };
        } else if (isUndefined) {
            point1 = { x: 2, y: -3 };
            point2 = { x: 2, y: 3 };
        } else if (isNegative) {
            point1 = { x: -3, y: 3 };
            point2 = { x: 3, y: -2 };
        } else {
            // Default to positive slope
            point1 = { x: -3, y: -2 };
            point2 = { x: 3, y: 3 };
        }
    }
    
    return {
        type: 'slope_graph',
        width: 300,
        height: 300,
        xRange: [-5, 5],
        yRange: [-5, 5],
        line: { point1, point2 },
        showGrid: true,
        showAxes: true
    };
}

// Generate coordinate segment uiSpec
function generateCoordinateSegment(question) {
    const pointMatch = question.match(/\((-?\d+),\s*(-?\d+)\).*\((-?\d+),\s*(-?\d+)\)/);
    let point1 = { x: -2, y: 1 };
    let point2 = { x: 4, y: 3 };
    
    if (pointMatch) {
        point1 = { x: parseInt(pointMatch[1]), y: parseInt(pointMatch[2]) };
        point2 = { x: parseInt(pointMatch[3]), y: parseInt(pointMatch[4]) };
    }
    
    return {
        type: 'coordinate_segment',
        width: 300,
        height: 300,
        xRange: [-6, 6],
        yRange: [-6, 6],
        points: [point1, point2],
        showSegment: true,
        showGrid: true,
        showAxes: true
    };
}

// Generate triangle diagram uiSpec
function generateTriangleDiagram(question) {
    // Check if isosceles
    const isIsosceles = question.toLowerCase().includes('isosceles');
    // Check if right triangle
    const isRight = question.toLowerCase().includes('right triangle') || 
                   question.toLowerCase().includes('90°');
    
    // Extract angle values if present
    const angleMatch = question.match(/(\d+)°/g);
    let topAngle = 60;
    if (angleMatch && angleMatch.length > 0) {
        topAngle = parseInt(angleMatch[0]);
    }
    
    return {
        type: 'geometry_triangle_diagram',
        width: 300,
        height: 300,
        vertices: [
            { x: 150, y: 50, label: 'A' },
            { x: 80, y: 220, label: 'B' },
            { x: 220, y: 220, label: 'C' }
        ],
        angles: [
            { vertex: 0, label: `${topAngle}°` },
            { vertex: 1, label: 'x°' },
            { vertex: 2, label: isIsosceles ? 'x°' : 'y°' }
        ],
        styleHints: {
            lineColor: '#00ffff',
            labelColor: '#00ffff'
        }
    };
}

// Generate polygon diagram uiSpec
function generatePolygonDiagram(question) {
    // Determine number of sides
    let sides = 5; // default pentagon
    if (question.toLowerCase().includes('hexagon') || question.includes('6-sided') || question.includes('six')) {
        sides = 6;
    } else if (question.toLowerCase().includes('octagon') || question.includes('8-sided') || question.includes('eight')) {
        sides = 8;
    } else if (question.toLowerCase().includes('heptagon') || question.includes('7-sided') || question.includes('seven')) {
        sides = 7;
    } else if (question.toLowerCase().includes('quadrilateral') || question.includes('4-sided') || question.includes('four')) {
        sides = 4;
    }
    
    // Generate regular polygon vertices
    const cx = 150, cy = 150, r = 100;
    const points = [];
    const labels = 'ABCDEFGHIJ'.split('');
    
    for (let i = 0; i < sides; i++) {
        const angle = (2 * Math.PI * i / sides) - Math.PI / 2; // Start from top
        points.push({
            x: Math.round(cx + r * Math.cos(angle)),
            y: Math.round(cy + r * Math.sin(angle)),
            label: labels[i]
        });
    }
    
    return {
        type: 'polygon_basic',
        width: 300,
        height: 300,
        points,
        labels: true,
        styleHints: {
            lineColor: '#00ffff',
            labelColor: '#00ffff'
        }
    };
}

// Generate angle diagram uiSpec  
function generateAngleDiagram(question) {
    // Extract angle value if present
    const angleMatch = question.match(/(\d+)°/);
    let angleDegrees = 45;
    if (angleMatch) {
        angleDegrees = parseInt(angleMatch[1]);
    }
    
    // Calculate ray endpoint based on angle
    const radians = (angleDegrees * Math.PI) / 180;
    const rayLength = 100;
    const endX = Math.round(150 + rayLength * Math.cos(-radians));
    const endY = Math.round(150 + rayLength * Math.sin(-radians));
    
    return {
        type: 'geometry_angle_diagram',
        width: 300,
        height: 300,
        showGrid: false,
        lines: [
            { from: { x: 150, y: 150 }, to: { x: 250, y: 150 } },
            { from: { x: 150, y: 150 }, to: { x: endX, y: endY } }
        ],
        angleArc: {
            center: { x: 150, y: 150 },
            radius: 35,
            startRay: 0,
            endRay: 1,
            label: `${angleDegrees}°`,
            measureDegrees: angleDegrees
        },
        styleHints: {
            baseLineColor: '#00ffff',
            highlightAngleColor: '#ffff00',
            labelsColor: '#00ffff'
        }
    };
}

// Generate transformation grid uiSpec
function generateTransformationGrid(question) {
    const isReflection = question.toLowerCase().includes('reflect');
    const isRotation = question.toLowerCase().includes('rotat');
    
    // Extract point if present
    const pointMatch = question.match(/\((-?\d+),\s*(-?\d+)\)/);
    let point = { x: 2, y: 3 };
    if (pointMatch) {
        point = { x: parseInt(pointMatch[1]), y: parseInt(pointMatch[2]) };
    }
    
    let type = 'coordinate_grid_points';
    if (isReflection) {
        type = question.toLowerCase().includes('y-axis') ? 'reflection_vertical_line' : 'reflection_horizontal_line';
    } else if (isRotation) {
        type = 'rotation_90';
    }
    
    return {
        type,
        width: 300,
        height: 300,
        xRange: [-5, 5],
        yRange: [-5, 5],
        points: [point],
        showGrid: true,
        showAxes: true,
        highlightPoint: true
    };
}

// Determine if a question needs a uiSpec based on topic and content
function needsUiSpec(question, subtopicId) {
    // Already has uiSpec
    if (question.uiSpec) return false;
    
    const questionText = question.question.toLowerCase();
    
    // Check topic-based patterns
    for (const [topic, config] of Object.entries(VISUAL_TOPICS)) {
        if (subtopicId.includes(topic) || config.match.test(questionText)) {
            // Additional checks for specific question types that DON'T need diagrams
            if (questionText.includes('simplif') && !questionText.includes('graph')) return false;
            if (questionText.includes('evaluate') && !questionText.includes('graph')) return false;
            if (questionText.includes('solve for') && !questionText.includes('graph')) return false;
            if (questionText.includes('factor')) return false;
            
            return true;
        }
    }
    
    return false;
}

// Generate appropriate uiSpec based on question content
function generateUiSpec(question, subtopicId) {
    const questionText = question.question.toLowerCase();
    
    // Slope questions
    if (subtopicId.includes('slope') || questionText.includes('slope') || 
        questionText.includes('rise') || questionText.includes('steepest')) {
        return generateSlopeGraph(question.question, question.answer);
    }
    
    // Coordinate geometry (distance, midpoint)
    if (subtopicId.includes('coordinate') && 
        (questionText.includes('distance') || questionText.includes('midpoint'))) {
        return generateCoordinateSegment(question.question);
    }
    
    // Triangle questions
    if (questionText.includes('triangle') || questionText.includes('isosceles')) {
        return generateTriangleDiagram(question.question);
    }
    
    // Polygon questions
    if (questionText.includes('polygon') || questionText.includes('pentagon') || 
        questionText.includes('hexagon') || questionText.includes('octagon') ||
        (questionText.includes('sides') && questionText.includes('interior'))) {
        return generatePolygonDiagram(question.question);
    }
    
    // Angle questions (not in triangles or polygons)
    if ((questionText.includes('angle') && !questionText.includes('triangle') && 
        !questionText.includes('polygon')) || questionText.includes('degrees')) {
        return generateAngleDiagram(question.question);
    }
    
    // Transformation questions
    if (questionText.includes('reflect') || questionText.includes('rotat') || 
        questionText.includes('translat') || questionText.includes('transform')) {
        return generateTransformationGrid(question.question);
    }
    
    // Graphing linear functions
    if (subtopicId.includes('graphing') || (questionText.includes('graph') && 
        (questionText.includes('line') || questionText.includes('y =')))) {
        return generateSlopeGraph(question.question, question.answer);
    }
    
    return null;
}

// Process a single JSON file
function processFile(filePath, dryRun = false) {
    const fileName = path.basename(filePath);
    let modified = false;
    let uiSpecsAdded = 0;
    
    try {
        const raw = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(raw);
        
        if (!data.questions || !Array.isArray(data.questions)) {
            return { modified: false, uiSpecsAdded: 0 };
        }
        
        const subtopicId = data.subtopicId || fileName.replace(/_beginner.*|_advanced.*|_expert.*/, '');
        
        data.questions = data.questions.map(q => {
            if (needsUiSpec(q, subtopicId)) {
                const uiSpec = generateUiSpec(q, subtopicId);
                if (uiSpec) {
                    q.uiSpec = uiSpec;
                    uiSpecsAdded++;
                    modified = true;
                }
            }
            return q;
        });
        
        if (modified && !dryRun) {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
        }
        
        return { modified, uiSpecsAdded };
    } catch (err) {
        console.error(`  ✗ Error processing ${fileName}: ${err.message}`);
        return { modified: false, uiSpecsAdded: 0, error: err.message };
    }
}

// Main function
function main() {
    const args = process.argv.slice(2);
    
    if (args.length < 1) {
        console.log('Usage: node tools/add_uispecs.js <directory> [--dry-run]');
        console.log('');
        console.log('Adds uiSpec visual diagrams to math questions that benefit from graphics.');
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
    
    console.log(`\n🎨 uiSpec Generator Tool`);
    console.log(`   Directory: ${inputDir}`);
    console.log(`   Mode: ${dryRun ? 'DRY RUN (no changes)' : 'LIVE (will modify files)'}`);
    console.log('');
    
    const files = fs.readdirSync(inputDir)
        .filter(f => f.endsWith('.json') && !f.includes('schema') && !f.includes('index'));
    
    let totalModified = 0;
    let totalUiSpecsAdded = 0;
    let errors = 0;
    
    for (const file of files) {
        const filePath = path.join(inputDir, file);
        const result = processFile(filePath, dryRun);
        
        if (result.error) {
            errors++;
        } else if (result.modified) {
            totalModified++;
            totalUiSpecsAdded += result.uiSpecsAdded;
            console.log(`  ✓ ${file}: +${result.uiSpecsAdded} uiSpecs`);
        }
    }
    
    console.log('');
    console.log('📈 Summary:');
    console.log(`   Files processed: ${files.length}`);
    console.log(`   Files modified: ${totalModified}`);
    console.log(`   uiSpecs added: ${totalUiSpecsAdded}`);
    if (errors > 0) {
        console.log(`   Errors: ${errors}`);
    }
    
    if (dryRun) {
        console.log('');
        console.log('💡 This was a dry run. Run without --dry-run to apply changes.');
    }
}

main();
