//first try
const http = require('http');
const { readFileSync } = require('fs')

const homePage = readFileSync('./index.html', 'utf8')

const server = http.createServer((req, res) => {
    console.log('user hit the server');

    const url = req.url;
    if (url === '/') {
        res.writeHead(200, { 'content-type': 'text/html' }); //mime types
        res.write(homePage);
        res.end();
    }
    //about page
    else if (url === '/about' || url === '/about/') {
        res.writeHead(200, { 'Content-Type': 'text/html' }); //mime types
        res.write('<h1>About page</h1>');
        res.end('response end');
    }
    //404
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 page not found');
        res.end();
    }


    console.log(req.method, req.url, 'request object');
});

//port is a communication endpoint each protocol has a specific ports
//but when we're in development mode, this is really arbitrary
server.listen(5000, () => {
    console.log('Server is running on port 5000');
});