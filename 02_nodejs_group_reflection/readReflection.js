const fs = require('fs');

console.log("Start reading file");

fs.readFile('reflection.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log("File content:", data);
});

console.log("Done reading file")