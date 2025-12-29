function parseFilename(filename) {
    const name = filename.replace('.json', '');
    const parts = name.split('_');
    
    let partIndex = -1;
    for (let i = parts.length - 1; i >= 0; i--) {
        if (parts[i].startsWith('part')) {
            partIndex = i;
            break;
        }
    }
    
    if (partIndex === -1) {
        console.warn('Invalid filename format:', filename);
        return null;
    }
    
    const difficulty = parts[partIndex - 1];
    let subtopicId = parts.slice(0, partIndex - 1).join('_');
    const part = parseInt(parts[partIndex].replace('part', ''));
    
    // Strip subject prefix for Physical Science files
    if (subtopicId.startsWith('physical_science_')) {
        subtopicId = subtopicId.replace('physical_science_', '');
    }
    
    return { subtopicId, difficulty, part };
}

// Test
const fname = 'physical_science_chemistry_basics_advanced_part1.json';
const result = parseFilename(fname);
console.log('Filename:', fname);
console.log('Result:', result);
console.log('Expected: { subtopicId: "chemistry_basics", difficulty: "advanced", part: 1 }');
