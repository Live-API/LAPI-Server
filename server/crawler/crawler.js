const NodeCrawler = require('crawler');
const Crawler = require('./crawlerModel.js');

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

module.exports = (url, endpointName, DomObj) => {
  let data = [];

  const c = new NodeCrawler({
    maxConnections: 10,
    callback: (error, res, done) => {
      console.log(`Processing page scrape for ${endpointName}`);
      if (error) console.log(error);
      else {
        const $ = res.$;
        async function extractData() {
          try {
            // *** Selectors for DOM elements
            // Text only
            // JSON.stringify => added the await section
            await $('.cardDetails').each((index, element) => {
              data.push($(element).text());
            });
            // Support for Pagination
            let href = $('[aria-label="Next page"]').attr('href');
            // If href exists, scrape next page
            if (href) c.queue('https:' + href);
            // At end of pagination, add/update document
            else {
              let scrapedData = new Crawler({
                // *** Endpoint Name
                endpoint: endpointName,
                data: JSON.stringify(data)
              })
              // Replace existing data property if the document exists
              const cachedData = (await Crawler.find({ endpoint: endpointName }));
              if (cachedData.length > 0) {
                await Crawler.update({
                  endpoint: endpointName
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
