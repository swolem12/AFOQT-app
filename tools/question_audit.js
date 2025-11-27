#!/usr/bin/env node
/**
 * Question Audit Tool for AFOQT Quest
 * 
 * Scans Test Content/Math JSON files and reports missing fields
 * (explanation, fastStrategy, uiSpec) into a JSON report.
 * 
 * This is a READ-ONLY tool that never modifies any question files.
 * 
 * Usage:
 *   node tools/question_audit.js [inputDir] [outputFile]
 *   node tools/question_audit.js "Test Content/Math" "tools/report_question_audit.json"
 * 
 * If no arguments provided, defaults to:
 *   inputDir: "Test Content/Math"
 *   outputFile: "tools/report_question_audit.json"
 */

const fs = require('fs');
const path = require('path');

// Required fields to check for
const REQUIRED_FIELDS = ['explanation'];
const OPTIONAL_ENHANCED_FIELDS = ['fastStrategy', 'uiSpec', 'steps'];
const ALL_TRACKED_FIELDS = [...REQUIRED_FIELDS, ...OPTIONAL_ENHANCED_FIELDS];

/**
 * Recursively find all JSON files in a directory
 */
function findJsonFiles(dir, files = []) {
    if (!fs.existsSync(dir)) {
        console.error(`Directory not found: ${dir}`);
        return files;
    }
    
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    // Files to exclude from audit (metadata files, not question content)
    const excludedPatterns = ['schema', 'index'];
    
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            findJsonFiles(fullPath, files);
        } else if (entry.isFile() && entry.name.endsWith('.json')) {
            // Skip metadata files that don't contain questions
            const isExcluded = excludedPatterns.some(pattern => entry.name.includes(pattern));
            if (!isExcluded) {
                files.push(fullPath);
            }
        }
    }
    
    return files;
}

/**
 * Audit a single question file
 */
function auditFile(filePath) {
    const result = {
        file: filePath,
        questions: [],
        stats: {
            total: 0,
            withExplanation: 0,
            withFastStrategy: 0,
            withUiSpec: 0,
            withSteps: 0,
            missingRequired: 0
        }
    };
    
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);
        
        // Handle both array format and object with questions array
        const questions = Array.isArray(data) ? data : (data.questions || []);
        
        result.stats.total = questions.length;
        
        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            const questionId = q.id || `question_${i + 1}`;
            const missingFields = [];
            const presentFields = [];
            
            // Check each tracked field
            for (const field of ALL_TRACKED_FIELDS) {
                if (q[field] !== undefined && q[field] !== null && q[field] !== '') {
                    presentFields.push(field);
                    
                    // Update stats
                    if (field === 'explanation') result.stats.withExplanation++;
                    if (field === 'fastStrategy') result.stats.withFastStrategy++;
                    if (field === 'uiSpec') result.stats.withUiSpec++;
                    if (field === 'steps') result.stats.withSteps++;
                } else {
                    missingFields.push(field);
                }
            }
            
            // Check for missing required fields
            const missingRequired = REQUIRED_FIELDS.filter(f => !presentFields.includes(f));
            if (missingRequired.length > 0) {
                result.stats.missingRequired++;
            }
            
            // Only include questions with missing fields in detailed report
            if (missingFields.length > 0) {
                result.questions.push({
                    id: questionId,
                    index: i,
                    missingFields,
                    presentFields,
                    hasMissingRequired: missingRequired.length > 0
                });
            }
        }
    } catch (error) {
        result.error = error.message;
    }
    
    return result;
}

/**
 * Generate summary statistics
 */
function generateSummary(fileResults) {
    const summary = {
        totalFiles: fileResults.length,
        totalQuestions: 0,
        fieldsOverview: {
            explanation: { present: 0, total: 0, percentage: '0%' },
            fastStrategy: { present: 0, total: 0, percentage: '0%' },
            uiSpec: { present: 0, total: 0, percentage: '0%' },
            steps: { present: 0, total: 0, percentage: '0%' }
        },
        filesWithMissingRequired: 0,
        filesWithErrors: 0
    };
    
    for (const result of fileResults) {
        if (result.error) {
            summary.filesWithErrors++;
            continue;
        }
        
        summary.totalQuestions += result.stats.total;
        summary.fieldsOverview.explanation.present += result.stats.withExplanation;
        summary.fieldsOverview.explanation.total += result.stats.total;
        summary.fieldsOverview.fastStrategy.present += result.stats.withFastStrategy;
        summary.fieldsOverview.fastStrategy.total += result.stats.total;
        summary.fieldsOverview.uiSpec.present += result.stats.withUiSpec;
        summary.fieldsOverview.uiSpec.total += result.stats.total;
        summary.fieldsOverview.steps.present += result.stats.withSteps;
        summary.fieldsOverview.steps.total += result.stats.total;
        
        if (result.stats.missingRequired > 0) {
            summary.filesWithMissingRequired++;
        }
    }
    
    // Calculate percentages
    for (const field of Object.keys(summary.fieldsOverview)) {
        const info = summary.fieldsOverview[field];
        if (info.total > 0) {
            info.percentage = ((info.present / info.total) * 100).toFixed(1) + '%';
        }
    }
    
    return summary;
}

/**
 * Main audit function
 */
function runAudit(inputDir, outputFile) {
    console.log(`\n📊 AFOQT Quest Question Audit Tool\n`);
    console.log(`Scanning: ${inputDir}`);
    console.log(`Output: ${outputFile}\n`);
    
    const jsonFiles = findJsonFiles(inputDir);
    
    if (jsonFiles.length === 0) {
        console.log('No JSON files found.');
        return;
    }
    
    console.log(`Found ${jsonFiles.length} JSON files to audit.\n`);
    
    const fileResults = [];
    
    for (const file of jsonFiles) {
        const result = auditFile(file);
        fileResults.push(result);
        
        const relPath = path.relative(process.cwd(), file);
        if (result.error) {
            console.log(`  ❌ ${relPath} - Error: ${result.error}`);
        } else if (result.stats.missingRequired > 0) {
            console.log(`  ⚠️  ${relPath} - ${result.stats.missingRequired}/${result.stats.total} questions missing required fields`);
        } else {
            console.log(`  ✓  ${relPath} - ${result.stats.total} questions (all have required fields)`);
        }
    }
    
    const summary = generateSummary(fileResults);
    
    const report = {
        generatedAt: new Date().toISOString(),
        inputDir,
        summary,
        files: fileResults
    };
    
    // Ensure output directory exists
    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputFile, JSON.stringify(report, null, 2));
    
    console.log(`\n📈 Summary:`);
    console.log(`   Total files scanned: ${summary.totalFiles}`);
    console.log(`   Total questions: ${summary.totalQuestions}`);
    console.log(`   Files with missing required fields: ${summary.filesWithMissingRequired}`);
    console.log(`   Files with errors: ${summary.filesWithErrors}`);
    console.log(`\n📊 Field Coverage:`);
    console.log(`   explanation: ${summary.fieldsOverview.explanation.percentage} (${summary.fieldsOverview.explanation.present}/${summary.fieldsOverview.explanation.total})`);
    console.log(`   fastStrategy: ${summary.fieldsOverview.fastStrategy.percentage} (${summary.fieldsOverview.fastStrategy.present}/${summary.fieldsOverview.fastStrategy.total})`);
    console.log(`   uiSpec: ${summary.fieldsOverview.uiSpec.percentage} (${summary.fieldsOverview.uiSpec.present}/${summary.fieldsOverview.uiSpec.total})`);
    console.log(`   steps: ${summary.fieldsOverview.steps.percentage} (${summary.fieldsOverview.steps.present}/${summary.fieldsOverview.steps.total})`);
    console.log(`\n✅ Report saved to: ${outputFile}\n`);
}

// Parse command line arguments
const args = process.argv.slice(2);
const inputDir = args[0] || 'Test Content/Math';
const outputFile = args[1] || 'tools/report_question_audit.json';

runAudit(inputDir, outputFile);
