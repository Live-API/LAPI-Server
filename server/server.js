const express = require('express');
const pug = require('pug');
const path = require('path');
const bodyParser = require('body-parser');
const userController = require('./user/userController.js');

const app = express();
const PORT = 4000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../client/views'));
app.use('/static', express.static(path.join(__dirname, '../client/public')));
app.use(bodyParser());

app.get('/', (req, res) => {
    res.send('Home page');
});

app.get('/config', (req, res) => {
  res.render('createUser');
});

app.post('/config/admin', 
  (req, res, next) => {
    res.locals.username = req.body.username;
    res.locals.password = req.body.password;
    res.locals.admin = true;
    next();
  },
  userController.createUser,
  (req, res) => {
    res.send(res.locals.userid);
  }
);

app.listen(PORT, () => {
    console.log(`App is listening on Port ${PORT}`);
});