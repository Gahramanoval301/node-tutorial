const express = require('express');
const app = express();

//this callback function will be called when each time user perform a get request
app.get('/', (req, res)=>{
    console.log('user hit the resource');
    res.status(200).send('Hello, world! -Home page');

})
app.get('/about', (req, res)=>{
    res.status(200).send('Hello, world! -About page');
})
app.all('*', (req, res)=>{
    console.log('Qluqluqluqluqluqluqluqluq');
    res.status(404).send('This content will be shown in all pages of web')
})


app.listen(5000, ()=>{
    console.log(`Server listening on port 5000`);
})

//* useful methods
//app.get
//app.post
//app.put
//app.delete
//app.all
//app.use
//app.listen