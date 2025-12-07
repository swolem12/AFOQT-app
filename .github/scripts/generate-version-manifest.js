#!/usr/bin/env node

/**
 * Generate Version Manifest for AFOQT Quest
 * 
 * This script:
 * 1. Reads all Test Content files
 * 2. Generates a unique hash of their contents
 * 3. Increments the cache version number
 * 4. Writes updated manifest to version-manifest.json
 * 
 * This manifest is checked by:
 * - Service Worker (sw.js) activate event - detects version changes
 * - App.js init() function - triggers cache invalidation if needed
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const MANIFEST_PATH = path.join(__dirname, '../../version-manifest.json');
const CONTENT_DIR = path.join(__dirname, '../../Test Content');

/**
 * Generate SHA256 hash of all content files
 */
function generateContentHash() {
    const hash = crypto.createHash('sha256');
    
    // Walk through all JSON files in Test Content directory
    function walkDir(dir) {
        const files = fs.readdirSync(dir);
        
        for (const file of files.sort()) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                walkDir(filePath);
            } else if (file.endsWith('.json')) {
                // Hash file contents for this content file
                const content = fs.readFileSync(filePath, 'utf8');
                hash.update(content);
            }
        }
    }
    
    try {
        walkDir(CONTENT_DIR);
        return hash.digest('hex').substring(0, 16); // Use first 16 chars
    } catch (e) {
        console.warn('Could not generate content hash:', e.message);
        return 'unknown-' + Date.now();
    }
}

/**
 * Generate patch-level version hashes
 */
function generatePatchVersions() {
    const patches = {};
    const patchDir = CONTENT_DIR;
    
    const patchFiles = [
        'Patch_18.json',
        'Patch_20.json',
        'Patch_21.json',
        'Patch_22.json'
    ];
    
    for (const patchFile of patchFiles) {
        const patchPath = path.join(patchDir, patchFile);
        if (fs.existsSync(patchPath)) {
            const content = fs.readFileSync(patchPath, 'utf8');
            const hash = crypto.createHash('sha256')
                .update(content)
                .digest('hex')
                .substring(0, 8);
            
            const patchId = patchFile.replace('.json', '').toLowerCase();
            patches[patchId] = {
                version: 1,
                hash: hash,
                lastUpdated: new Date().toISOString()
            };
        }
    }
    
    return patches;
}

/**
 * Load existing manifest or create new one
 */
function loadManifest() {
    try {
        if (fs.existsSync(MANIFEST_PATH)) {
            const data = fs.readFileSync(MANIFEST_PATH, 'utf8');
            return JSON.parse(data);
        }
    } catch (e) {
        console.warn('Could not load existing manifest:', e.message);
    }
    
    // Return default manifest structure
    return {
        appVersion: '1.0.0',
        cacheVersion: 75,
        contentHash: 'initial',
        lastUpdated: new Date().toISOString(),
        patches: {}
    };
}

/**
 * Update and save manifest
 */
function updateManifest() {
    const manifest = loadManifest();
    const newContentHash = generateContentHash();
    
    // Only increment version if content actually changed
    if (newContentHash !== manifest.contentHash) {
        manifest.cacheVersion += 1;
        manifest.contentHash = newContentHash;
        console.log(`✅ Content changed: incrementing cache version to ${manifest.cacheVersion}`);
    } else {
        console.log(`ℹ️  Content unchanged: version remains ${manifest.cacheVersion}`);
    }
    
    // Update timestamp
    manifest.lastUpdated = new Date().toISOString();
    
    // Update patch versions
    manifest.patches = generatePatchVersions();
    
    // Ensure we have required fields
    manifest.appVersion = manifest.appVersion || '1.0.0';
    
    // Write manifest
    fs.writeFileSync(
        MANIFEST_PATH,
        JSON.stringify(manifest, null, 2) + '\n',
        'utf8'
    );
    
    console.log(`✅ Version manifest updated:`);
    console.log(`   Cache Version: ${manifest.cacheVersion}`);
    console.log(`   Content Hash: ${manifest.contentHash}`);
    console.log(`   Last Updated: ${manifest.lastUpdated}`);
    console.log(`   Path: ${MANIFEST_PATH}`);
    
    return manifest;
}

/**
 * Main execution
 */
try {
    console.log('🔄 Generating version manifest...');
    const manifest = updateManifest();
    console.log('\n✨ Version manifest generation complete!');
    process.exit(0);
} catch (error) {
    console.error('❌ Error generating version manifest:', error.message);
    process.exit(1);
}
