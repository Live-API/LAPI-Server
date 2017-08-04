const express = require('express');
const pug = require('pug');
const path = require('path');
const bodyParser = require('body-parser');
const userController = require('./user/userController.js');
const crawlerController = require('./crawler/crawlerController.js');

const app = express();
const PORT = 4000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../client/views'));
app.use('/static', express.static(path.join(__dirname, '../client/public')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Home page');
});

app.get('/config', 
  userController.checkFirstUser,
  (req, res) => {
    console.log(res.locals.newUser);
    res.render('createUser', {firstTime: !!res.locals.newUser});
  }
);

app.get('/endpoint', crawlerController.getCache);

app.post('/config/admin', 
  userController.checkFirstUser,
  userController.createUser,
  (req, res) => {
    res.send(res.locals.userid);
  }
);

app.listen(PORT, () => {
    console.log(`App is listening on Port ${PORT}`);
});

// Demo interval scrape
//crawlerController.startScrapeInterval('pizza', 10000);
