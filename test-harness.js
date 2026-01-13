#!/usr/bin/env node

/**
 * Comprehensive test harness for AFOQT-app
 * Tests: file access, JSON parsing, SW, fetch paths, CSS
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://swolem12.github.io/AFOQT-app';
const TIMEOUT = 5000;

let passed = 0;
let failed = 0;
let warnings = 0;

function log(type, message, detail = '') {
  const colors = {
    'pass': '\x1b[32m✓\x1b[0m',
    'fail': '\x1b[31m✗\x1b[0m',
    'warn': '\x1b[33m⚠\x1b[0m',
    'info': '\x1b[36mℹ\x1b[0m'
  };
  console.log(`${colors[type] || '○'} ${message}${detail ? ` (${detail})` : ''}`);
  
  if (type === 'pass') passed++;
  else if (type === 'fail') failed++;
  else if (type === 'warn') warnings++;
}

function testURL(url) {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      log('fail', `Timeout: ${url}`);
      resolve(false);
    }, TIMEOUT);
    
    const req = https.request(url, { method: 'HEAD' }, (res) => {
      clearTimeout(timeout);
      if (res.statusCode === 200) {
        log('pass', url);
        resolve(true);
      } else {
        log('fail', url, `HTTP ${res.statusCode}`);
        resolve(false);
      }
    });
    
    req.on('error', (err) => {
      clearTimeout(timeout);
      log('fail', url, err.message);
      resolve(false);
    });
    
    req.end();
  });
}

async function runTests() {
  console.log('\n═══════════════════════════════════════════════════');
  console.log('   AFOQT-app Comprehensive Test Suite');
  console.log('═══════════════════════════════════════════════════\n');
  
  // Core files
  console.log('📄 Core Files:');
  await testURL(`${BASE_URL}/`);
  await testURL(`${BASE_URL}/index.html`);
  await testURL(`${BASE_URL}/app.js`);
  await testURL(`${BASE_URL}/styles.css`);
  await testURL(`${BASE_URL}/manifest.json`);
  
  // Scripts
  console.log('\n🔧 Scripts:');
  await testURL(`${BASE_URL}/sw.js`);
  await testURL(`${BASE_URL}/db.js`);
  await testURL(`${BASE_URL}/patch-loader.js`);
  await testURL(`${BASE_URL}/full-practice-test-loader.js`);
  await testURL(`${BASE_URL}/boot-sequence-globe.js`);
  
  // Assets
  console.log('\n🎨 Assets:');
  await testURL(`${BASE_URL}/assets/libs/anime.min.js`);
  await testURL(`${BASE_URL}/assets/icons/icon-192.png`);
  await testURL(`${BASE_URL}/assets/icons/icon-512.png`);
  
  // Test pages
  console.log('\n🧪 Test Pages:');
  await testURL(`${BASE_URL}/tests/admin-test-suite.html`);
  await testURL(`${BASE_URL}/tests/comprehensive-test-suite.html`);
  await testURL(`${BASE_URL}/tests/test-content-loading.html`);
  await testURL(`${BASE_URL}/tests/test-patch_18.html`);
  await testURL(`${BASE_URL}/tests/test-admin-all-questions.html`);
  await testURL(`${BASE_URL}/tests/test-db.html`);
  
  // JSON Content - Patches
  console.log('\n📋 Patch Configs:');
  await testURL(`${BASE_URL}/Test%20Content/patches/Patch_18.json`);
  await testURL(`${BASE_URL}/Test%20Content/patches/Patch_19.json`);
  await testURL(`${BASE_URL}/Test%20Content/patches/Patch_20.json`);
  await testURL(`${BASE_URL}/Test%20Content/patches/Patch_21.json`);
  await testURL(`${BASE_URL}/Test%20Content/patches/Patch_22.json`);
  
  // JSON Content - Vocabulary
  console.log('\n📝 Vocabulary:');
  await testURL(`${BASE_URL}/Test%20Content/Vocabulary/synonyms_beginner_part1.json`);
  await testURL(`${BASE_URL}/Test%20Content/Vocabulary/antonyms_beginner_part1.json`);
  await testURL(`${BASE_URL}/Test%20Content/Vocabulary/verbal_analogies_advanced_part1.json`);
  
  // JSON Content - Math
  console.log('\n➕ Math Knowledge:');
  await testURL(`${BASE_URL}/Test%20Content/Math/factoring_advanced_part1.json`);
  await testURL(`${BASE_URL}/Test%20Content/Math/word_problems_equation_setup_beginner_part1.json`);
  
  // JSON Content - Arithmetic
  console.log('\n🔢 Arithmetic Reasoning:');
  await testURL(`${BASE_URL}/Test%20Content/Arithmetic/arithmetic_basic_word_problems_beginner_part1.json`);
  await testURL(`${BASE_URL}/Test%20Content/Arithmetic/arithmetic_fractions_decimals_beginner_part1.json`);
  
  // JSON Content - Reading (with trailing space in folder)
  console.log('\n📖 Reading Comprehension:');
  await testURL(`${BASE_URL}/Test%20Content/Reading%20Comprehension%20/reading_comprehension_beginner_passage7.json`);
  await testURL(`${BASE_URL}/Test%20Content/Reading%20Comprehension%20/reading_comprehension_advanced_passage25.json`);
  
  // JSON Content - Other subjects
  console.log('\n✈️ Other Content:');
  await testURL(`${BASE_URL}/Test%20Content/Instrument%20Comprehension/instrument_comprehension_beginner_part1.json`);
  await testURL(`${BASE_URL}/Test%20Content/Aviation/aviation_information_beginner.json`);
  await testURL(`${BASE_URL}/Test%20Content/Block%20Counting/block_counting_beginner_part1.json`);
  await testURL(`${BASE_URL}/Test%20Content/Table%20Reading/table_reading_beginner_part1.json`);
  await testURL(`${BASE_URL}/Test%20Content/Physical%20Science/physical_science_earth_space_beginner_part1.json`);
  await testURL(`${BASE_URL}/Test%20Content/Situational/situational_judgment_beginner.json`);
  
  // Index pages
  console.log('\n📑 Index/Config Files:');
  await testURL(`${BASE_URL}/Test%20Content/reading_comprehension_index.json`);
  await testURL(`${BASE_URL}/Test%20Content/math_knowledge_index.json`);
  await testURL(`${BASE_URL}/Test%20Content/full_afoqt_practice_test_config_v1.json`);
  
  // Local file system checks
  console.log('\n🔍 Local Filesystem Checks:');
  const frontendPath = '/workspaces/AFOQT-app/Frontend';
  const requiredDirs = [
    'Test Content',
    'Test Content/patches',
    'Test Content/Vocabulary',
    'Test Content/Math',
    'Test Content/Arithmetic',
    'Test Content/Reading Comprehension ',
    'assets',
    'assets/icons',
    'assets/libs',
    'tests'
  ];
  
  requiredDirs.forEach(dir => {
    const fullPath = path.join(frontendPath, dir);
    if (fs.existsSync(fullPath)) {
      log('pass', `Dir: ${dir}`);
    } else {
      log('fail', `Dir: ${dir}`, 'not found');
    }
  });
  
  const requiredFiles = [
    'index.html',
    'app.js',
    'styles.css',
    'manifest.json',
    'sw.js',
    'db.js',
    'patch-loader.js'
  ];
  
  requiredFiles.forEach(file => {
    const fullPath = path.join(frontendPath, file);
    if (fs.existsSync(fullPath)) {
      log('pass', `File: ${file}`);
    } else {
      log('fail', `File: ${file}`, 'not found');
    }
  });
  
  // Backend structure
  console.log('\n🛠️ Backend Structure:');
  const backendPath = '/workspaces/AFOQT-app/Backend';
  const backendDirs = ['tools', 'docs'];
  backendDirs.forEach(dir => {
    const fullPath = path.join(backendPath, dir);
    if (fs.existsSync(fullPath)) {
      log('pass', `Dir: ${dir}`);
    } else {
      log('warn', `Dir: ${dir}`, 'optional');
    }
  });
  
  // Summary
  console.log('\n═══════════════════════════════════════════════════');
  console.log(`   Results: ${passed} passed, ${failed} failed, ${warnings} warnings`);
  console.log('═══════════════════════════════════════════════════\n');
  
  const success = failed === 0;
  process.exit(success ? 0 : 1);
}

runTests().catch((err) => {
  console.error('Test harness error:', err);
  process.exit(1);
});
