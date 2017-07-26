const express = require('express');
const pug = require('pug');
const path = require('path');
const userController = require('./user/userController.js');

const app = express();
const PORT = 4000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../client/views'));

app.get('/', (req, res) => {
    res.send('Home page');
});

app.get('/config', userController.createUser, (req, res) => {
  res.render('createUser', {uid: res.locals.userid});
});

app.listen(PORT, () => {
    console.log(`App is listening on Port ${PORT}`);
});