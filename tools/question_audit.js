#!/usr/bin/env node
/**
 * question_audit.js - Read-only audit script for Math JSON question files
 * 
 * This script scans Math question JSON files and reports missing fields
 * (explanation, fastStrategy, uiSpec) without modifying any files.
 * 
 * Usage:
 *   node tools/question_audit.js [inputDir] [outputFile]
 *   
 *   inputDir   - Directory containing Math JSON files (default: 'Test Content/Math')
 *   outputFile - Output JSON report file (default: 'tools/report_question_audit.json')
 * 
 * Example:
 *   node tools/question_audit.js "Test Content/Math" tools/report_question_audit.json
 * 
 * Output Report Format:
 *   {
 *     "auditDate": "2024-01-15T10:30:00.000Z",
 *     "summary": {
 *       "totalFiles": 10,
 *       "totalQuestions": 150,
 *       "missingExplanation": 5,
 *       "missingFastStrategy": 120,
 *       "missingUiSpec": 140
 *     },
 *     "files": [
 *       {
 *         "filename": "geometry_basics_beginner_part1.json",
 *         "questionCount": 15,
 *         "questions": [
 *           { "id": "mk_geo_b_001", "missingFields": ["fastStrategy"] },
 *           ...
 *         ]
 *       },
 *       ...
 *     ]
 *   }
 */

const fs = require('fs');
const path = require('path');

// Fields to check for each question
const REQUIRED_FIELDS = ['explanation', 'fastStrategy', 'uiSpec'];

/**
 * Check if a value is considered "present" (not null, undefined, or empty string)
 * @param {*} value - Value to check
 * @returns {boolean} True if value is present
 */
function isPresent(value) {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string' && value.trim() === '') return false;
    if (typeof value === 'object' && Object.keys(value).length === 0) return false;
    return true;
}

/**
 * Audit a single JSON file and return missing field information
 * @param {string} filePath - Path to the JSON file
 * @returns {Object|null} File audit result or null if error
 */
function auditFile(filePath) {
    const filename = path.basename(filePath);
    
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);
        
        if (!data.questions || !Array.isArray(data.questions)) {
            console.warn(`Warning: ${filename} does not contain a questions array`);
            return {
                filename,
                error: 'No questions array found',
                questionCount: 0,
                questions: []
            };
        }
        
        const questionResults = data.questions.map(question => {
            const id = question.id || 'unknown';
            const missingFields = REQUIRED_FIELDS.filter(field => !isPresent(question[field]));
            
            return {
                id,
                missingFields
            };
        }).filter(q => q.missingFields.length > 0); // Only include questions with missing fields
        
        return {
            filename,
            questionCount: data.questions.length,
            questionsWithMissingFields: questionResults.length,
            questions: questionResults
        };
    } catch (error) {
        console.error(`Error reading ${filename}: ${error.message}`);
        return {
            filename,
            error: error.message,
            questionCount: 0,
            questions: []
        };
    }
}

/**
 * Get all JSON files in a directory (non-recursive)
 * @param {string} dir - Directory path
 * @returns {string[]} Array of JSON file paths
 */
function getJsonFiles(dir) {
    try {
        const files = fs.readdirSync(dir);
        return files
            .filter(file => file.endsWith('.json') && !file.includes('schema'))
            .map(file => path.join(dir, file))
            .filter(filePath => fs.statSync(filePath).isFile());
    } catch (error) {
        console.error(`Error reading directory ${dir}: ${error.message}`);
        return [];
    }
}

/**
 * Generate summary statistics from file audit results
 * @param {Object[]} fileResults - Array of file audit results
 * @returns {Object} Summary statistics
 */
function generateSummary(fileResults) {
    let totalFiles = fileResults.length;
    let totalQuestions = 0;
    let missingExplanation = 0;
    let missingFastStrategy = 0;
    let missingUiSpec = 0;
    let filesWithErrors = 0;
    
    fileResults.forEach(file => {
        if (file.error) {
            filesWithErrors++;
            return;
        }
        
        totalQuestions += file.questionCount;
        
        file.questions.forEach(q => {
            if (q.missingFields.includes('explanation')) missingExplanation++;
            if (q.missingFields.includes('fastStrategy')) missingFastStrategy++;
            if (q.missingFields.includes('uiSpec')) missingUiSpec++;
        });
    });
    
    return {
        totalFiles,
        filesWithErrors,
        totalQuestions,
        questionsWithMissingFields: fileResults.reduce((sum, f) => sum + (f.questionsWithMissingFields || 0), 0),
        missingExplanation,
        missingFastStrategy,
        missingUiSpec,
        // Calculate completeness: total possible fields = totalQuestions * 3
        // Complete fields = total possible - missing fields
        completenessPercent: totalQuestions > 0 
            ? (((totalQuestions * 3) - missingExplanation - missingFastStrategy - missingUiSpec) / (totalQuestions * 3) * 100).toFixed(1)
            : '0.0'
    };
}

/**
 * Main audit function
 * @param {string} inputDir - Directory to scan
 * @param {string} outputFile - Output file path
 */
function runAudit(inputDir, outputFile) {
    console.log('='.repeat(60));
    console.log('AFOQT Question Audit - Read-Only Analysis');
    console.log('='.repeat(60));
    console.log(`Input directory: ${inputDir}`);
    console.log(`Output file: ${outputFile}`);
    console.log('');
    
    // Verify input directory exists
    if (!fs.existsSync(inputDir)) {
        console.error(`Error: Input directory does not exist: ${inputDir}`);
        process.exit(1);
    }
    
    // Get all JSON files
    const jsonFiles = getJsonFiles(inputDir);
    console.log(`Found ${jsonFiles.length} JSON files to audit`);
    console.log('');
    
    if (jsonFiles.length === 0) {
        console.warn('No JSON files found in the specified directory');
        return;
    }
    
    // Audit each file
    console.log('Auditing files...');
    const fileResults = jsonFiles.map(filePath => {
        const result = auditFile(filePath);
        if (result.questionsWithMissingFields > 0 || result.error) {
            console.log(`  ${result.filename}: ${result.questionsWithMissingFields || 0} questions with missing fields`);
        }
        return result;
    });
    console.log('');
    
    // Generate summary
    const summary = generateSummary(fileResults);
    
    // Create report
    const report = {
        auditDate: new Date().toISOString(),
        inputDirectory: inputDir,
        summary,
        files: fileResults
    };
    
    // Write report to file
    try {
        const outputDir = path.dirname(outputFile);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        fs.writeFileSync(outputFile, JSON.stringify(report, null, 2), 'utf8');
        console.log(`Report written to: ${outputFile}`);
    } catch (error) {
        console.error(`Error writing report: ${error.message}`);
        process.exit(1);
    }
    
    // Print summary to console
    console.log('');
    console.log('='.repeat(60));
    console.log('AUDIT SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total files scanned:        ${summary.totalFiles}`);
    console.log(`Files with errors:          ${summary.filesWithErrors}`);
    console.log(`Total questions:            ${summary.totalQuestions}`);
    console.log(`Questions with issues:      ${summary.questionsWithMissingFields}`);
    console.log('');
    console.log('Missing Field Counts:');
    console.log(`  - explanation:            ${summary.missingExplanation}`);
    console.log(`  - fastStrategy:           ${summary.missingFastStrategy}`);
    console.log(`  - uiSpec:                 ${summary.missingUiSpec}`);
    console.log('');
    console.log(`Overall completeness:       ${summary.completenessPercent}%`);
    console.log('='.repeat(60));
}

// CLI entry point
if (require.main === module) {
    const args = process.argv.slice(2);
    const inputDir = args[0] || 'Test Content/Math';
    const outputFile = args[1] || 'tools/report_question_audit.json';
    
    runAudit(inputDir, outputFile);
}

// Export for testing
module.exports = {
    auditFile,
    getJsonFiles,
    generateSummary,
    runAudit,
    isPresent
};
