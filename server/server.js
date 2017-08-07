const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs')
const pug = require('pug');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userController = require('./user/userController.js');
const crawlerController = require('./crawler/crawlerController.js');
const endpointController = require('./endpoint/endpointController.js');
const sessionController = require('./session/sessionController.js');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../client/views'));
app.use('/static', express.static(path.join(__dirname, '../client/public')));
app.use(bodyParser.json());
app.use(cookieParser());

// ----------------------
// Home
// ----------------------

// Testing this index.html page to get the DOM pointer to work
app.get('/static', (req, res) => {
    res.sendFile(path.join(__dirname + './../index.html'));
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

/* 
  
  For our route, we would define different endpoints, depending on the website we are looking to scrape
  Brett mentioned how we would eventually support different versions of configuration

*/

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
  endpointController.setEndpoint,
  crawlerController.startScrapeInterval
);


// ----------------------
// HTTPS Config
// ----------------------

const privateKey  = fs.readFileSync('ssl/key.pem', 'utf8');
const certificate = fs.readFileSync('ssl/cert.pem', 'utf8');
const credentials = {key: privateKey, cert: certificate};
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
const HTTP_PORT = 4000;
const HTTPS_PORT = 4443;

httpServer.listen(HTTP_PORT, () => console.log(`HTTP on port ${HTTP_PORT}`));
httpsServer.listen(HTTPS_PORT, () => console.log(`HTTPS on port ${HTTPS_PORT}`));

//app.listen(PORT, () => {
//    console.log(`App is listening on Port ${PORT}`);
//});

// Demo interval scrape
//crawlerController.startScrapeInterval('pizza', 10000);
// crawlerController.restartIntervals();