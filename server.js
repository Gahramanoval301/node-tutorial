const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises

const logEvents = require("./logEvents");
const EventEmitter = require('events');

class Emitter extends EventEmitter { }

//intialize object
const myEmitter = new Emitter();
// add listener for log event
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));


//Now 1st we need to define a port for our web server
//we need to say what port will be on

const PORT = process.env.PORT || 3500 //because if we were to host this somewhere it would use this information
//if we were to host this somwhere it would have a different value here

const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image') ? 'utf8' : '',
        );
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;
        response.writeHead(
            filePath.includes('404.html') ? 404 : 200,
            { 'Content-Type': contentType })
        response.end(contentType === 'application/json' ? JSON.stringify(data) : data
        );
    } catch (error) {
        console.log(error);
        myEmitter.emit('log', `${error.name}\t${error.message}`, 'errLog.txt')
        response.statusCode = 500;
        response.end();
    }
}

//let's create minimal server
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //Emit event
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt')

    let filePath;

    //* It's the best case we can
    const extension = path.extname(req.url);

    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = "text/plain";
            break;
        default: //!important 
            contentType = 'text/html';
            break;
    }

    filePath =
        contentType === 'text/html' && req.url === '/' ?
            path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url);

    if (!filePath.endsWith('\\') && contentType === 'text/html') {
        filePath = path.join(__dirname, 'views', req.url, 'index.html');
        console.log(filePath,'new');
    }

    console.log(req.url, 'req0url');
    console.log((filePath), 'filepath');
    console.log(path.join(__dirname, 'views', req.url, 'index.html'), 'log');
    //makes .html extension not required in the browser
    if (!extension && req.url.slice(-1) !== '/')
        filePath += '.html'

    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        //serve the file
        // console.log(path.parse(filePath), '200');
        serveFile(filePath, contentType, res);


    } else {
        // console.log(path.parse(filePath), '404');
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                //301 direct
                res.writeHead(301, { 'Location': '/new-page' })
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, { 'Location': '/' })
                res.end();
                break;
            default:
                //serve a 404 response
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res)
                break;

        }


        // if(path.parse(filePath).base.endsWith('/')){
        //     res.writeHead(301, { 'Location': '/' })
        //     res.end();
        // }
        // res.statusCode = 404;
        // res.setHeader('Content-Type', 'text/html');
        // fs.readFile(path.join(__dirname, 'views', '404.html'), 'utf8', (err, data) => {
        //     if (err) throw err;
        //     res.end(JSON.stringify(data));
        // })
    }
    //!but it's not really good enough. because we would have statements for every address and ervy file
    // if (req.url === '/' || req.url === 'index.html') {
    //     res.statusCode = 200; //successful response
    //     res.setHeader(' Content-Type', 'text/html;') //we serving html page
    //     filePath = path.join(__dirname, 'views', 'index.html');
    //     fs.readFile(filePath, 'utf8', (err, data) => {
    //         if (err) throw err;
    //         res.end(JSON.stringify(data));
    //     })
    // }
    //!2nd way, but it's also not dynamic enough
    // switch (req.url) {
    //     case '/':
    //         res.statusCode = 200; //successful response
    //         filePath = path.join(__dirname, 'views', 'index.html');
    //         fs.readFile(filePath, 'utf8', (err, data) => {
    //             if (err) throw err;
    //             res.end(JSON.stringify(data));
    //         })
    //         break;

    //     default:
    //         break;
    // }
});

//we;re not quite ready to launch our server yet, because it still needs to listen on port/for requests
server.listen(PORT, () => console.log(`Server runnin on port: ${PORT}`))
//just now it's not going to serve anything we're not sending any type of response back yet,
// but it will log the request and request method, so let's go write your port number on browser