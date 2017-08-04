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

// Testing this index.html page to get the DOM pointer to work
app.get('/static', (req, res) => {
    res.sendFile(path.join(__dirname + './../index.html'));
});

app.get('/config', 
  userController.checkFirstUser,
  (req, res) => {
    console.log(res.locals.newUser);
    res.render('createUser', {firstTime: !!res.locals.newUser});
  }
);

/* 
  
  For our route, we would define different endpoints, depending on the website we are looking to scrape
  Brett mentioned how we would eventually support different versions of configuration

*/

/*
  
  Post request is used instead of a configuration file.
  {
    url:
    interval:
    endpoint:
    text:
    images:
    backgroundImages:
    pagination:
  }

  PENN'S TO-DOS

  1. Send object w/ text property through POST request to the back-end
    i.e. {
      text: [DOM Path, DOM Path, DOM Path]
      }

  2. Middleware function (startScrapeInterval) will send text property to NodeCrawler
      - Add parameter on crawlerController
    
  3. Crawler will perform scrape on the HTML elements, and send data to MongoDB
      - Loop through text property for each DOM path provided.
      - Check if the DOM path is being read by Cheerio

  WEEKEND
  
  4. Front-End Stretch Feature
      - Selection of Nested Elements
      - Pagination
      - Images
      - Background-Images
*/

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
