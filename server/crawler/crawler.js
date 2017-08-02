const NodeCrawler = require('crawler');
const Crawler = require('./crawlerModel.js');

/* Crawler calls 'callback' function expression, scraping website (c.queue)
for Cheerio selectors. Document is created using data array, and saved to the Crawler model. */

// *** represents items that will be provided by the config file
class NCrawler {
  constructor() {
    this.c = new NodeCrawler({
      maxConnections: 10,
      callback: this.callback,
    });
    this.data = [];
  }
  
}
  
NCrawler.prototype.callback = function (error, res, done) {
  console.log('starting scrape')
  const c = this.c;
  const data = this.data;
  console.log('this', this);
  
  if (error) console.log(error);
  else {
    const $ = res.$;

    extractData = async () => {
      try {
        // *** Selectors for DOM elements
        await $('.cardDetails').each((index, element) => {
          console.log(data);
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
            endpoint: "config",
            data: JSON.stringify(data)
          })

          // Replace existing data property if the document exists
          const cachedData = (await Crawler.find({endpoint: "config"}));
          if (cachedData.length > 0) {
            await Crawler.update({endpoint: 'config'}, { $set: { 
              data: JSON.stringify(data),
              scrape_date: Date.now(),
            }});
            console.log('Updated existing scraped data')
          }
          // Create a new document if scraping for the first time
          else {
            await scrapedData.save();
            console.log('Saved new scraped data')
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

// REMOVED by Brett -- this now exports c itself, so queue can be called in another file. We'll probably have to further modularize this file so it can get more info from the config file (stuff with ***'s)
// *** url from config file is passed to queue
//c.queue('https://www.trulia.com/CA/San_Francisco/');

module.exports = NCrawler;