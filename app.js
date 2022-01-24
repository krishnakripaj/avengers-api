const express = require('express');
const app = express(); // created an express application

app.listen(3000, () => {
    console.log("Listening on Port 3000");
});

// Callback function here is called a route handler
app.get('/', (req, res) => {
    res.send('You have successfully connected to our API! Welcome');
});

// GET ALL
app.get('/api/avengers', (req, res) => {
    let avengers = ['Iron Man', 'Captain America', 'Black Widow', 'Thor'];
    res.send(avengers);
});

// GET with Params
app.get('/api/avengers/:avengerId', (req, res) => {
    //eg: localhost:3000/api/avengers/3?filterBy="avengerType"
    let optionalParam = req.query.filterBy; // accessing optional parameter
    res.send('You have requested for the Avenger Id ' + req.params.avengerId + ' and the optional parameters passed for filterBy is ' + optionalParam);
});