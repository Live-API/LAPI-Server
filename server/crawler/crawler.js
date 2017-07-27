const NodeCrawler = require('crawler');
const Crawler = require('./crawlerModel.js');
// Create a new instance of the node crawler
const c = new NodeCrawler({
    maxConnections: 10,
    callback: (error, res, done) => {
        if (error) console.log(error);
        else {
            const $ = res.$;
            // Select the DOM elements to extract with Cheerio
            // Not working
            let data = [];
            $('.cardDetails > ul:first-child').each((index, element) => {
                data.push($(element).text());
            });
            console.log(data);
            // Crawler.save();
            // save each item to the Mongoose database
            // console.log("this is the anchor element", a);
        };
        done();
    }
});

c.queue('https://www.trulia.com/CA/San_Francisco/');