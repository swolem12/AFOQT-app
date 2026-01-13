#!/usr/bin/env node
/**
 * verify-content-linking.js
 * Standalone sanity check to ensure all Test Content JSON files are
 * discoverable, parsed, and grouped by subject/subtopic/difficulty.
 *
 * Usage: node tools/verify-content-linking.js
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const contentRoot = path.join(root, 'Test Content');

// Map folder names to subjectIds and a friendly label
const SUBJECTS = [
  { folder: 'Vocabulary', subjectIds: ['vocabulary', 'verbal_analogies'] },
  { folder: 'Math', subjectIds: ['math_knowledge'] },
  { folder: 'Arithmetic', subjectIds: ['arithmetic_reasoning'] },
  { folder: 'Reading Comprehension ', subjectIds: ['reading_comprehension'] },
  { folder: 'Instrument Comprehension', subjectIds: ['instrument_comprehension'] },
  { folder: 'Table Reading', subjectIds: ['table_reading'] },
  { folder: 'Physical Science', subjectIds: ['physical_science'] },
  { folder: 'Block Counting', subjectIds: ['block_counting'] },
  { folder: 'Aviation', subjectIds: ['aviation_information'] },
  { folder: 'Situational', subjectIds: ['situational_judgment'] },
];

function parseFilename(file) {
  // Accept patterns like: foo_beginner_part1.json, foo_advanced.json
  const regex = /^(.*)_(beginner|advanced|expert)(?:_part\d+)?\.json$/i;
  const match = file.match(regex);
  if (!match) return null;
  return {
    subtopicId: match[1],
    difficulty: match[2].toLowerCase()
  };
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    return { __error: err.message };
  }
}

function main() {
  const problems = [];
  const summary = [];

  SUBJECTS.forEach(({ folder, subjectIds }) => {
    const folderPath = path.join(contentRoot, folder);
    if (!fs.existsSync(folderPath)) {
      problems.push(`Missing subject folder: ${folder}`);
      return;
    }

    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.json'));
    let totalQuestions = 0;
    const subtopics = new Map();

    files.forEach(file => {
      const parsed = parseFilename(file);
      if (!parsed) {
        problems.push(`Unparseable filename in ${folder}: ${file}`);
        return;
      }
      const { subtopicId, difficulty } = parsed;
      const filePath = path.join(folderPath, file);
      const data = readJson(filePath);
      if (data.__error) {
        problems.push(`JSON parse error in ${filePath}: ${data.__error}`);
        return;
      }
      const questions = Array.isArray(data.questions) ? data.questions.length : 0;
      totalQuestions += questions;

      if (!subtopics.has(subtopicId)) {
        subtopics.set(subtopicId, { beginner: 0, advanced: 0, expert: 0, files: [] });
      }
      const entry = subtopics.get(subtopicId);
      entry[difficulty] += questions;
      entry.files.push({ file, questions, difficulty });

      // Basic schema sanity
      if (!Array.isArray(data.questions)) {
        problems.push(`No questions array in ${filePath}`);
      }
    });

    summary.push({ folder, subjectIds, files: files.length, totalQuestions, subtopics });
  });

  // Output
  console.log('=== CONTENT LINKING CHECK ===');
  summary.forEach(({ folder, subjectIds, files, totalQuestions, subtopics }) => {
    console.log(`\n${folder}`);
    console.log(`  Subject IDs: ${subjectIds.join(', ')}`);
    console.log(`  Files: ${files}`);
    console.log(`  Questions: ${totalQuestions}`);
    console.log(`  Subtopics (${subtopics.size}):`);
    subtopics.forEach((val, key) => {
      console.log(`    - ${key}: B:${val.beginner} A:${val.advanced} E:${val.expert} (files: ${val.files.length})`);
    });
  });

  if (problems.length) {
    console.log('\n❌ Issues found:');
    problems.forEach(p => console.log(' - ' + p));
    process.exitCode = 1;
  } else {
    console.log('\n✅ All subjects, subtopics, and JSON files are linked and well-formed.');
  }
}

main();
