import fs from 'fs';

// Use this utility function when reading the file of words.
// This will keep our testing simple in this exercise.
function readJSONSync(filePath) {
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContents);
}
