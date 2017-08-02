const Crawler = require('./crawlerModel.js');
const NodeCrawler = require('./crawler.js');

// Object containing intervals, so they can be paused or terminated
// Key is the name of the endpoint/scrape
// Value is the timer object returned when the interval is set
const intervals = {};

const crawlerController = {
  getCache: async (req, res) => {
    try {
      const config = req.query.config;
      // Send document back as JSON object
      res.json(await Crawler.find({"config": config}));
    } catch (err) {
      console.log (err);
    }
    next();
  },
  
  // Sets up a scrape to run on an interval
  startScrapeInterval: (endpoint, interval) => {
    // If the endpoint already has an interval
      // Stop the interval
    if (intervals[endpoint]) clearInterval(intervals[endpoint]);
    
    // Create a new interval
    intervals[endpoint] = setInterval(
      () => NodeCrawler('https://www.trulia.com/CA/San_Francisco/'),
      interval
    );
  }
}

module.exports = crawlerController;