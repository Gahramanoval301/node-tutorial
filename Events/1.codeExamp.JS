//FREECODECAMP
const EventEmitter = require('events');

const customEmitter = new EventEmitter(); //we create an instance from the events module

//we have 2  methods
// on - listen for an event
// emit - emit an event

//1st parameter - event
//2nd parameter - callback which is consist of your actions
customEmitter.on('response', (name, age) => { //add event listener
    console.log(`data received from ${name}:${age}`);
})
customEmitter.on('response', (name, age) => { //add event listener
    console.log(`data received from ${name}:${age}`);
})
customEmitter.emit('response', 'leman', 18) //call it/ emit it
//this emit function will be called all response register functions