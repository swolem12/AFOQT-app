/**
 * Vocabulary Question Enrichment Tool
 * Adds steps and fastStrategy fields to vocabulary questions following C1 tutoring method
 * 
 * Run: node tools/enrich_vocabulary.js
 */

const fs = require('fs');
const path = require('path');

const vocabDir = path.join(__dirname, '..', 'Test Content', 'Vocabulary');

// Topic-specific strategies for vocabulary
const topicStrategies = {
    synonyms: {
        steps: [
            "1. Read the target word and recall its meaning.",
            "2. Look at each choice and think of its definition.",
            "3. Find the choice that means the same or nearly the same as the target word.",
            "4. Eliminate options that are opposites or unrelated."
        ],
        fastStrategy: "Look for the word that could replace the target word in a sentence without changing the meaning."
    },
    antonyms: {
        steps: [
            "1. Read the target word and identify its meaning.",
            "2. Think of what the opposite concept would be.",
            "3. Scan the choices for the word that represents the opposite meaning.",
            "4. Eliminate synonyms and unrelated words."
        ],
        fastStrategy: "Ask yourself: 'What's the opposite?' and match that to the choices."
    },
    verbal_analogies: {
        steps: [
            "1. Identify the relationship between the first pair of words.",
            "2. Name the relationship type (opposites, part-to-whole, cause-effect, etc.).",
            "3. Apply that same relationship to the second pair.",
            "4. Choose the word that completes the pattern."
        ],
        fastStrategy: "Make a sentence showing the relationship: 'A is to B as C is to ____' and fill in the blank."
    },
    vocabulary_in_context: {
        steps: [
            "1. Read the sentence carefully, noting the blank or underlined word.",
            "2. Look for context clues (other words that hint at meaning).",
            "3. Predict what type of word would make sense before looking at choices.",
            "4. Pick the choice that fits both meaning and tone."
        ],
        fastStrategy: "Replace the word with each choice mentally; the one that sounds natural is usually correct."
    },
    word_roots_affixes: {
        steps: [
            "1. Break the word into parts (prefix, root, suffix).",
            "2. Identify meanings of each part (e.g., 'un-' = not, '-tion' = act of).",
            "3. Combine the meanings to understand the whole word.",
            "4. Match to the definition or example given."
        ],
        fastStrategy: "Focus on the root word; prefixes and suffixes modify the root's meaning."
    },
    confusing_word_pairs: {
        steps: [
            "1. Read both words in the pair carefully.",
            "2. Recall the specific meaning difference (e.g., affect vs effect).",
            "3. Check the context to see which meaning fits.",
            "4. Choose the word that matches the intended meaning."
        ],
        fastStrategy: "Create a quick mnemonic: 'Affect is the Action (both start with A); Effect is the End result (both start with E).'"
    },
    highfreq_vocab: {
        steps: [
            "1. Read the word and try to recall its meaning.",
            "2. If unsure, look for word parts (prefixes, roots, suffixes) that provide clues.",
            "3. Consider the context or example sentence if provided.",
            "4. Match to the definition that best fits."
        ],
        fastStrategy: "Trust your first instinct on words you've seen before; for unfamiliar words, use word parts as clues."
    },
    sentence_completion: {
        steps: [
            "1. Read the entire sentence to understand the overall meaning.",
            "2. Identify signal words (but, therefore, although) that indicate direction.",
            "3. Predict the type of word needed (positive/negative, action/description).",
            "4. Choose the word that logically completes the thought."
        ],
        fastStrategy: "Cover the choices, predict your own word, then find the closest match."
    }
};

function getSubtopicFromFilename(filename) {
    // Extract subtopic from filename like "synonyms_beginner_part1.json"
    const parts = filename.replace('.json', '').split('_');
    // Handle multi-word subtopics like "verbal_analogies" or "word_roots_affixes"
    if (parts.includes('analogies')) return 'verbal_analogies';
    if (parts.includes('roots')) return 'word_roots_affixes';
    if (parts.includes('context')) return 'vocabulary_in_context';
    if (parts.includes('pairs')) return 'confusing_word_pairs';
    if (parts.includes('completion')) return 'sentence_completion';
    if (parts.includes('vocab')) return 'highfreq_vocab';
    return parts[0]; // synonyms, antonyms
}

function enrichQuestion(question, subtopicId) {
    const strategy = topicStrategies[subtopicId] || topicStrategies.synonyms;
    
    // Add steps if missing
    if (!question.steps || !Array.isArray(question.steps) || question.steps.length === 0) {
        question.steps = [...strategy.steps];
    }
    
    // Add fastStrategy if missing
    if (!question.fastStrategy || question.fastStrategy.trim() === '') {
        question.fastStrategy = strategy.fastStrategy;
    }
    
    return question;
}

function processFile(filePath) {
    const filename = path.basename(filePath);
    let raw;
    
    try {
        raw = fs.readFileSync(filePath, 'utf8');
    } catch (e) {
        console.log(`  Error reading ${filename}: ${e.message}`);
        return { processed: 0, enriched: 0, error: true };
    }
    
    let data;
    try {
        data = JSON.parse(raw);
    } catch (e) {
        console.log(`  JSON parse error in ${filename}: ${e.message}`);
        return { processed: 0, enriched: 0, error: true };
    }
    
    if (!data.questions || !Array.isArray(data.questions)) {
        console.log(`  No questions array in ${filename}`);
        return { processed: 0, enriched: 0, error: false };
    }
    
    const subtopicId = data.subtopicId || getSubtopicFromFilename(filename);
    let enriched = 0;
    
    data.questions = data.questions.map(q => {
        const hadSteps = q.steps && Array.isArray(q.steps) && q.steps.length > 0;
        const hadFastStrategy = q.fastStrategy && q.fastStrategy.trim() !== '';
        
        const enrichedQ = enrichQuestion(q, subtopicId);
        
        if (!hadSteps || !hadFastStrategy) {
            enriched++;
        }
        
        return enrichedQ;
    });
    
    // Write back with proper formatting
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    return { processed: data.questions.length, enriched, error: false };
}

// Main execution
console.log('Vocabulary Question Enrichment Tool');
console.log('===================================\n');

let totalProcessed = 0;
let totalEnriched = 0;
let filesWithErrors = 0;
let filesProcessed = 0;

const files = fs.readdirSync(vocabDir).filter(f => f.endsWith('.json')).sort();

for (const file of files) {
    const filePath = path.join(vocabDir, file);
    console.log(`Processing: ${file}`);
    
    const result = processFile(filePath);
    
    if (result.error) {
        filesWithErrors++;
    } else {
        filesProcessed++;
        totalProcessed += result.processed;
        totalEnriched += result.enriched;
        if (result.enriched > 0) {
            console.log(`  ✓ Enriched ${result.enriched} of ${result.processed} questions`);
        }
    }
}

console.log('\n===================================');
console.log('Summary:');
console.log(`  Files processed: ${filesProcessed}`);
console.log(`  Files with errors: ${filesWithErrors}`);
console.log(`  Total questions: ${totalProcessed}`);
console.log(`  Questions enriched: ${totalEnriched}`);
console.log('===================================');
