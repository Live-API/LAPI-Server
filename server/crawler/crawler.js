const NodeCrawler = require('crawler');
const Crawler = require('./crawlerModel.js');

/* Crawler calls 'callback' function expression, scraping website (c.queue)
for Cheerio selectors. Document is created using data array, and saved to the Crawler model. */

// *** represents items that will be provided by the config file

let data = [];

const c = new NodeCrawler({
    maxConnections: 10,
    callback: (error, res, done) => {
        if (error) console.log(error);
        else {
            const $ = res.$;
            async function extractData() {
                try {
                    // *** Selectors for DOM elements
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
                            endpoint: "config",
                            data: JSON.stringify(data)
                        })
                        // Replace existing data property if the document exists
                        const cachedData = (await Crawler.find({endpoint: "config"}));
                        if (cachedData.length > 0) {
                            await Crawler.update({endpoint: 'config'}, { $set: { data: JSON.stringify(data) }});
                        // Create a new document if scraping for the first time
                        } else {
                            await scrapedData.save();
                        }
                    }
                    console.log(await Crawler.find({}));
                } catch (err) {
                    console.log(err);
                }
            }
            extractData();
        };
        done();
    }
});

// *** url from config file is passed to queue
c.queue('https://www.trulia.com/CA/San_Francisco/');