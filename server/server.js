const express = require('express');
const userController = require('./user/userController.js');

const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
    res.send('Home page');
});

app.get('/config', userController.createUser, (req, res) => {
  res.send('config page ' + res.locals.userid);
});

app.listen(PORT, () => {
    console.log(`App is listening on Port ${PORT}`);
});