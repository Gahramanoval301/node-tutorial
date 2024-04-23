//second try
const http = require('http');
const path = require('path');
const { readFileSync } = require('fs');

const server = http.createServer((req, res) => {

    //TODO content type 
    const extension = path.extname(req.url);

    let contentType;
    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        default:
            contentType = 'text/html';
            break;
    }
    console.log(contentType, req.url);

    //TODO file path
    if (contentType === 'text/html' && req.url === '/') {
        // If the request is for '/', set filePath to index.html
        filePath = path.join(__dirname, 'index.html');
    } else {
        // For other requests, set filePath based on request URL
        filePath = path.join(__dirname, req.url);
    }

    console.log('Requested file:', filePath);

    //TODO serve the file
    try {
        const data = readFileSync(filePath, 'utf8');
        res.writeHead(200, { 'Content-Type': contentType });
        res.write(data);
    } catch (error) {
        console.error('Error reading file:', error);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
    } finally {
        res.end();
    }
});
const PORT = 5000;
server.listen(PORT, () => {
    console.log('Server listening on port');
})