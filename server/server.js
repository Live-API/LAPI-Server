const express = require('express');
const pug = require('pug');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userController = require('./user/userController.js');
const crawlerController = require('./crawler/crawlerController.js');
const endpointController = require('./endpoint/endpointController.js');
const sessionController = require('./session/sessionController.js');

const app = express();
const PORT = 4000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../client/views'));
app.use('/static', express.static(path.join(__dirname, '../client/public')));
app.use(bodyParser.json());
app.use(cookieParser());

// ----------------------
// Home
// ----------------------

app.get('/', (req, res) => {
    res.send('Home page');
});


// ----------------------
// Authentication
// ----------------------

// Temporary authentication route
app.post('/auth',
  userController.verifyUser,
  sessionController.startSession,
  (req, res) => {
    res.status(200);
    res.send('Authenticated!');
});

app.get('/config', 
  userController.checkFirstUser,
  (req, res) => {
    res.render('createUser', {firstTime: !!res.locals.newUser});
  }
);

app.post('/config/admin', 
  userController.checkFirstUser,
  userController.createUser,
  (req, res) => {
    res.send(res.locals.userid);
  }
);


// ----------------------
// Crawl endpoints
// ----------------------

app.get('/crawls/:endpoint', crawlerController.getCache);

app.post('/crawls',
  sessionController.isLoggedIn,
  endpointController.setEndpoint
);


app.listen(PORT, () => {
    console.log(`App is listening on Port ${PORT}`);
});

// Demo interval scrape
//crawlerController.startScrapeInterval('pizza', 10000);
crawlerController.restartIntervals();