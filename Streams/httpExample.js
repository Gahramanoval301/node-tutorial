//practical example when streams come in handy
var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    const fileStream = fs.createReadStream('../content/big.txt', { encoding: 'utf8' })
    fileStream.on('open', () => {
        fileStream.pipe(res)
    })
    fileStream.on('error', (err) => {
        res.end(err)
    })
})