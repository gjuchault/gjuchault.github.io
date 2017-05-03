const fs = require('fs');
const path = require('path');

const output = path.join(__dirname, '..', 'src', 'resumes.json');
const resumesPath = path.join(__dirname, '..', 'data', 'resumes');

const resumes = fs
  .readdirSync(path.join(resumesPath))
  .map(postPath => `/data/resumes/${postPath}`)

fs.writeFileSync(output, JSON.stringify(resumes));
