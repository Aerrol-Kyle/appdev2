const fs = require('fs');

fs.readFile('sample.txt', 'utf8', (err, data) => {
    if(err) {
        console.log('The file does not exist:', err);
    } else {
        console.log('File content:', data);
    }
});

fs.writeFile('newfile.txt', 'This is a new file created by Node.js!', (err, data) => {
    if(err) {
        console.log('Error creating file:', err);
    } else {
        console.log('File created successfuly!', data);
    }
});

fs.appendFile('sample.txt', '\nAppended content', (err, data) => {
    if(err) {
        console.log('Error appending content:', err);
    } else {
        console.log('Content appended successfully!', data);;
    }
});

fs.unlink('newfile.txt', (err) => {
    if(err) {
        console.log('Error deleting file:', err);
    } else {
        console.log('File deleted successfully!');
    }
});