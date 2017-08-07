const NodeCrawler = require('crawler');
const Crawler = require('./crawlerModel.js');
const EndpointModel = require('./../endpoint/endpointModel.js');

/* Crawler calls 'callback' function expression, scraping website (c.queue)
for Cheerio selectors. Document is created using data array, and saved to the Crawler model. */

// *** represents items that will be provided by the config file

/*

Passing data to the Web Crawler:
{
  Text: [ ]
  Images: [ ]
  BackgroundImages: [ ]
  Pagination: Key
}

Our callback function is divided into different sections:

  Extracting Text for DOM Elements
  Pagination
  Images - TBD
  BackgroundImages - TBD
  
  Accessing properties would result in clean data flow

*/

module.exports = (url, endpoint) => {
  let data = [];
  console.log('url', url);
  console.log('endpoint', endpoint);
// look up text within the endpoint model

  const c = new NodeCrawler({
    maxConnections: 10,
    callback: (error, res, done) => {
      console.log(`Processing page scrape for ${endpoint}`);
      if (error) console.log(error);
      else {
        const $ = res.$;
        async function extractData() {
          try {
            let text = await EndpointModel.find({ endpoint });
            // console.log('text', text);
            // console.log('text[0]', text[0]);
            // console.log('text[0].text', text[0].text);
            text = text[0].text;
            // *** Selectors for DOM elements
            // Text only
            // JSON.stringify => added the await section
            // Iterate through properties
            let properties = Object.keys(text);
            let domArr;
            await properties.forEach((property) => {
              domArr = text[property];
              domArr.forEach((element) => {
                // console.log('element', element);
                console.log('$(element)', $(element));
                  data.push($(element).text());
              });
            });
            // Support for Pagination
            // let href = $('[aria-label="Next page"]').attr('href');
            let href = false;
            // If href exists, scrape next page
            if (href) c.queue('https:' + href);
            // At end of pagination, add/update document
            else {
              let scrapedData = new Crawler({
                // *** Endpoint Name
                "endpoint": endpoint,
                data: JSON.stringify(data)
              })
              // Replace existing data property if the document exists
              const cachedData = (await Crawler.find({ "endpoint": endpoint }));
              if (cachedData.length > 0) {
                await Crawler.update({
                  "endpoint": endpoint
                },
                  {
                    $set: {
                      data: JSON.stringify(data),
                      scrape_date: Date.now(),
                    }
                  });
              }

              // Create a new document if scraping for the first time
              else {
                await scrapedData.save();
              }
            }
          } catch (err) {
            console.log(err);
          }
        }
        extractData();
        console.log('datalength:', data.length);
      };
      done();
    }
  });

  // *** url from config file is passed to queue
  c.queue(url);
}
