const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, 'out', '.nojekyll');

fs.writeFile(outputPath, '', (err) => {
  if (err) {
    console.error('Error creating .nojekyll file:', err);
    process.exit(1);
  }
  console.log('.nojekyll file created successfully!');
});