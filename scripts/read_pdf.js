const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: node scripts/read_pdf.js <PDF_PATH>');
    process.exit(1);
  }
  const abs = path.resolve(filePath);
  if (!fs.existsSync(abs)) {
    console.error('File not found:', abs);
    process.exit(1);
  }
  const dataBuffer = fs.readFileSync(abs);
  try {
    const data = await pdf(dataBuffer);
    console.log(data.text);
  } catch (e) {
    console.error('Failed to parse PDF:', e.message);
    process.exit(1);
  }
}

main();
