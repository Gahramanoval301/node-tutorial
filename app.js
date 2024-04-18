const http = require('http')
// Using the Eevent Emitter API
const server = http.createServer()
//emits request event
//subscribe to it/ listen for it / respond to it


const serverNotGood = http.createServer((req, res) => {
    res.end('Not good Approach')
})

//this callback function will be invoked every time someone visits our server
//we listen for request event and when that request comes in server emits the request event and then we can listen/respond for it
server.on('request', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello World\n')
})

server.listen(3000, () => {
    console.log('Server running on port 3000')
})