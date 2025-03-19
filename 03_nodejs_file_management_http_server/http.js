const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const EventEmitter = require('events');

const port = 3000;

const eventEmitter = new EventEmitter();

eventEmitter.on('fileCreated', (filename) => {
    console.log(`File created: ${filename}`);
});

eventEmitter.on('fileDeleted', (filename) => {
    console.log(`File deleted: ${filename}`);
});

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, query } = parsedUrl;

    const filePath = (filename) => path.join(__dirname, filename);

    if (pathname === '/create') {
        const filename = query.filename;
        const content = query.content || '';

        fs.writeFile(filePath(filename), content, (err) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Error creating file');
                return;
            }
            eventEmitter.emit('fileCreated', filename);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('File created successfully');
        });

    } else if (pathname === '/read') {
        const filename = query.filename;

        fs.readFile(filePath(filename), 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('File not found');
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(data);
        });

    } else if (pathname === '/update') {
        const filename = query.filename;
        const content = query.content || '';

        fs.appendFile(filePath(filename), content, (err) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Error updating file');
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('File updated successfully');
        });

    } else if (pathname === '/delete') {
        const filename = query.filename;

        fs.unlink(filePath(filename), (err) => {
            if (err) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('File not found');
                return;
            }
            eventEmitter.emit('fileDeleted', filename);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('File deleted successfully');
        });

    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Route not found');
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});