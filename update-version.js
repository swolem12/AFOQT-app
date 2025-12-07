#!/usr/bin/env node

/**
 * Update Version Manifest Locally
 * 
 * Usage:
 *   node update-version.js          # Auto-increment if content changed
 *   node update-version.js --force  # Force increment regardless
 * 
 * This script generates a new version-manifest.json with:
 * - Updated cache version number
 * - Content hash of all Test Content files
 * - Timestamp of update
 * - Patch version information
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const MANIFEST_PATH = path.join(__dirname, 'version-manifest.json');
const CONTENT_DIR = path.join(__dirname, 'Test Content');

const args = process.argv.slice(2);
const forceIncrement = args.includes('--force');

/**
 * Generate SHA256 hash of all content files
 */
function generateContentHash() {
    const hash = crypto.createHash('sha256');
    
    function walkDir(dir) {
        if (!fs.existsSync(dir)) {
            console.warn(`Content directory not found: ${dir}`);
            return;
        }
        
        const files = fs.readdirSync(dir);
        
        for (const file of files.sort()) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                walkDir(filePath);
            } else if (file.endsWith('.json')) {
                try {
                    const content = fs.readFileSync(filePath, 'utf8');
                    hash.update(content);
                } catch (e) {
                    console.warn(`Could not read file ${filePath}: ${e.message}`);
                }
            }
        }
    }
    
    try {
        walkDir(CONTENT_DIR);
        return hash.digest('hex').substring(0, 16);
    } catch (e) {
        console.warn('Could not generate content hash:', e.message);
        return 'unknown-' + Date.now();
    }
}

/**
 * Generate patch versions
 */
function generatePatchVersions() {
    const patches = {};
    const patchFiles = [
        'Patch_18.json',
        'Patch_20.json',
        'Patch_21.json',
        'Patch_22.json'
    ];
    
    for (const patchFile of patchFiles) {
        const patchPath = path.join(CONTENT_DIR, patchFile);
        if (fs.existsSync(patchPath)) {
            try {
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
            } catch (e) {
                console.warn(`Could not process patch ${patchFile}: ${e.message}`);
            }
        }
    }
    
    return patches;
}

/**
 * Load existing manifest
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
    
    return {
        appVersion: '1.0.0',
        cacheVersion: 75,
        contentHash: 'initial',
        lastUpdated: new Date().toISOString(),
        patches: {}
    };
}

/**
 * Main execution
 */
try {
    console.log('🔄 Updating version manifest...\n');
    
    const manifest = loadManifest();
    const newContentHash = generateContentHash();
    const oldVersion = manifest.cacheVersion;
    
    // Decide if we should increment version
    let shouldIncrement = forceIncrement;
    
    if (!shouldIncrement && newContentHash !== manifest.contentHash) {
        shouldIncrement = true;
        console.log(`📝 Content changed (hash: ${manifest.contentHash} → ${newContentHash})`);
    }
    
    if (shouldIncrement) {
        manifest.cacheVersion += 1;
        console.log(`✅ Cache version: ${oldVersion} → ${manifest.cacheVersion}`);
    } else {
        console.log(`ℹ️  Content unchanged - version remains ${manifest.cacheVersion}`);
    }
    
    manifest.contentHash = newContentHash;
    manifest.lastUpdated = new Date().toISOString();
    manifest.patches = generatePatchVersions();
    
    // Write manifest
    fs.writeFileSync(
        MANIFEST_PATH,
        JSON.stringify(manifest, null, 2) + '\n',
        'utf8'
    );
    
    console.log(`\n📊 Version Manifest Updated:`);
    console.log(`   Cache Version: ${manifest.cacheVersion}`);
    console.log(`   Content Hash: ${manifest.contentHash}`);
    console.log(`   Last Updated: ${manifest.lastUpdated}`);
    console.log(`   Patches: ${Object.keys(manifest.patches).length}`);
    console.log(`\n💾 Saved to: ${MANIFEST_PATH}`);
    console.log(`\n✨ Done! Users will see a fresh app on next visit.`);
    
    process.exit(0);
    
} catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
}
