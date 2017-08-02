const NodeCrawler = require('crawler');
const Crawler = require('./crawlerModel.js');

/* Crawler calls 'callback' function expression, scraping website (c.queue)
for Cheerio selectors. Document is created using data array, and saved to the Crawler model. */

// *** represents items that will be provided by the config file

module.exports = (url) => {
  // Instantiate the crawler
  c = new NodeCrawler({
    maxConnections: 10,
    callback: this.callback,
  });
  
  // Callback function runs when 
  const callback = (error, res, done) => {
    console.log('Starting scrape');
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
  
  // Data store for paginated scrape
  data = [];
  
  console.log('url', url);
  console.log(c);
  
  c.queue(url);
}
