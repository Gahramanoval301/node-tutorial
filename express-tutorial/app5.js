// MIDDLEWARE A BIT ADVANCE
//Express middleware are functions that execute during the request to the server
//each middleware has access to the request and response objects
const express = require('express');
const { logger } = require('./logger4,5');
const { authorize } = require('./authorize5');
const app = express();

//!but how i can apply this middleware to all my routes?
//*1. order is important ->app.use should be in the top of the all routes.
//*2. we can add here a path in //TODO app.use('/api', logger), even then your req paths can be like this:
//if you are in localhost5000:/api -> url is /
//If you are in localhost5000:/api/items -> url is /items
//so, it's gonna be apply to any route after this api based on your path which you give in app.use().
//TODO app.use('/api', logger)
//if we want to use more then: write in array
app.use([logger, authorize])
app.get('/', (req, res) => {
    res.send(`Home`)
})
app.get('/about', (req, res) => {
    res.send(`About`)
})
app.get('/api/items', (req, res) => {
    console.log(req.user); // {name:'john', id:3} -> it can detect the middleware f: authorize 
    res.send(`Items API`)
})
app.get('/api/products', (req, res) => {
    res.send(`Products API`)
})

app.listen(5000, () => {
    console.log(`Server is listening on 5000...`);
})