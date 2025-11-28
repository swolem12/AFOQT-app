const fs = require('fs');
const path = require('path');

const srcPath = path.resolve(__dirname, '../../Test Content/Arithmetic');
const outDir = path.dirname(srcPath); // same folder

function isHeaderLine(line) {
  const s = line.trim();
  if (!s) return false;
  // Accept names like arithmetic_basic_arithmetic_beginner_part1 or with .json
  return /^[a-z0-9_]+(\.json)?$/i.test(s) && s.startsWith('arithmetic_');
}

function normalizeFilename(header) {
  let name = header.trim();
  if (!name.endsWith('.json')) name += '.json';
  return name;
}

function splitFile() {
  const raw = fs.readFileSync(srcPath, 'utf8');
  const lines = raw.split(/\r?\n/);
  const sections = [];
  let currentHeader = null;
  let currentBuffer = [];

  function flush() {
    if (currentHeader && currentBuffer.length) {
      const jsonText = currentBuffer.join('\n').trim();
      if (jsonText) {
        sections.push({ header: currentHeader, jsonText });
      }
    }
    currentHeader = null;
    currentBuffer = [];
  }

  for (const line of lines) {
    if (isHeaderLine(line)) {
      // New section starting
      flush();
      currentHeader = normalizeFilename(line);
    } else {
      if (currentHeader) currentBuffer.push(line);
    }
  }
  // Flush last
  flush();

  if (!sections.length) {
    console.error('No sections detected.');
    process.exit(1);
  }

  // Write each section to its own file
  for (const { header, jsonText } of sections) {
    // Validate JSON and derive filename from metadata
    try {
      const obj = JSON.parse(jsonText);
      const subjectId = obj.subjectId || 'arithmetic_reasoning';
      const subtopicId = obj.subtopicId || 'unknown_subtopic';
      const difficulty = obj.difficulty || 'unknown_difficulty';
      const part = obj.part != null ? String(obj.part) : '1';

      const filename = `${subjectId.startsWith('arithmetic') ? 'arithmetic' : subjectId}_${subtopicId}_${difficulty}_part${part}.json`;
      const outPath = path.join(outDir, filename);

      const pretty = JSON.stringify(obj, null, 2);
      fs.writeFileSync(outPath, pretty + '\n', 'utf8');
      console.log('Wrote', outPath, `from section header ${header}`);
    } catch (e) {
      const rawPath = path.join(outDir, header.endsWith('.json') ? header : header + '.json');
      console.error('Failed to parse JSON for', header, e.message);
      // Write raw for inspection
      fs.writeFileSync(rawPath + '.raw', jsonText, 'utf8');
      console.error('Saved raw content to', rawPath + '.raw');
    }
  }
}

splitFile();
