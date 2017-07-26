const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Home page');
})

app.listen(4000, () => {
    console.log('App is listening on Port 4000');
})