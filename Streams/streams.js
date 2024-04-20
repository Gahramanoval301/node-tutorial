//Streams can be 1.writable, 2.readable, 3.duplex and 4.transform
//Streams extend event emitters
const { createReadStream } = require('fs')

const stream = createReadStream('../content/big.txt')

stream.on('data', (data) => {
    console.log(data)
})
stream.on('error', (err) => console.log(err))

//additional info:
//default 64kb size
//last buffer - remainder
//highWaterMark - control size
//const stream = createReadStream('../content/big.txt' , {highWaterMark:9000})
//const stream = createReadStream('../content/big.txt' , {encoding:'utf8'})