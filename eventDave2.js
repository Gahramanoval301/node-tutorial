const logEvents = require("./eventDave1");

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {

}

//intialize object
const myEmitter = new MyEmitter();

//add listener for log event
myEmitter.on('log', (msg) => logEvents(msg))

//Emit event
myEmitter.emit('log', 'Log event emitted')