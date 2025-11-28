const fs = require('fs');
const path = require('path');

const rawPath = path.resolve(__dirname, '../../Test Content/arithmetic_ratio_proportion_beginner_part1.json.raw');
const outPath = path.resolve(__dirname, '../../Test Content/arithmetic_ratio_proportion_beginner_part1.json');

function repair() {
  const raw = fs.readFileSync(rawPath, 'utf8');
  // Simple truncate approach: keep everything up to before broken question start
  const brokenIdx = raw.indexOf('"id": "ar_ratprop_b1_023"');
  if (brokenIdx === -1) {
    console.error('Broken question marker not found');
    process.exit(1);
  }
  const startOfBrokenObject = raw.lastIndexOf('{', brokenIdx);
  const keep = raw.slice(0, startOfBrokenObject);
  // Remove any trailing comma before closing the questions array
  // Remove trailing comma right before we close the questions array
  let cleaned = keep;
  const lastBraceIdx = cleaned.lastIndexOf('}\n');
  if (lastBraceIdx !== -1) {
    const after = cleaned.slice(lastBraceIdx + 2);
    if (/^\s*,/.test(after)) {
      cleaned = cleaned.slice(0, lastBraceIdx + 2) + after.replace(/^\s*,/, '');
    }
  }
  // Ensure we properly close the questions array and the root object
  const repaired = cleaned + '\n\n  ]\n}\n';

  try {
    const obj = JSON.parse(repaired);
    fs.writeFileSync(outPath, JSON.stringify(obj, null, 2) + '\n', 'utf8');
    console.log('Wrote repaired JSON to', outPath, 'with', obj.questions.length, 'questions');
  } catch (e) {
    console.error('Final repaired parse failed:', e.message);
    fs.writeFileSync(outPath + '.debug2', repaired, 'utf8');
    console.error('Saved debug2 to', outPath + '.debug2');
    process.exit(1);
  }
}

repair();
