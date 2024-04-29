// JSON
const express = require('express');
const { tours } = require('./data');
const app = express();

app.get('/', (req, res) => {
    res.json(tours)//sends a JSON response that is the parameter converted to JSON(using JSON.stringify)
})

app.listen(5000, () => {
    console.log(`Server is listening on port 5000...`);
})