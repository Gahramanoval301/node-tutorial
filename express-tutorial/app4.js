// MIDDLEWARE ->MANUALLY
//Express middleware are functions that execute during the request to the server
//each middleware has access to the request and response objects
const express = require('express');
const { logger } = require('./logger4,5');
const app = express();

//? app.get('/', (req, res) => {
    // ?    const url = req.url
    //  ?   const method = req.method
    //   ?  const time = new Date().getFullYear()
    //    ? console.log(method, url, time);
    //     ?res.send(`Home ${url} ${method} ${time}`)
    //? })
    //but if we have a lot of routes, then this way is not good for us
    //then:
    
    //we will stuck middleware in the middle
    app.get('/', logger, (req, res) => {
        res.send(`Home`)
    })
    app.get('/about', logger, (req, res) => {
        res.send(`About`)
    })
    app.get('/api/items', logger, (req, res) => {
        res.send(`Items API`)
    })
    app.get('/api/products', logger, (req, res) => {
        res.send(`Products API`)
    })
    //!but how i can apply this middleware to all my routes?
    //req => middleware => res
    //aslo we have there some built-in middleware such as app.use(express.static(path.join(__dirname,'/public')
    //our 3rd party middleware - //TODO morgan -> app.use(morgan('tiny'))
    app.listen(5000, () => {
        console.log(`Server is listening on 5000...`);
    })