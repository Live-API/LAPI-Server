const Crawler = require('./crawlerModel.js');
const Interval = require('./intervalModel.js');
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
  // Currently scrapes trulia only
  startScrapeInterval: async (endpoint, interval, url) => {
    // For test purposes:
    url = 'https://www.trulia.com/CA/San_Francisco/';
    
    // If the endpoint already has an interval
      // Stop the interval
    if (intervals[endpoint]) clearInterval(intervals[endpoint]);
    
    // Create a new interval
    intervals[endpoint] = setInterval(
      () => NodeCrawler(url, endpoint),
      interval
    );
    
    // Save the interval to the DB
    // Upsert (insert if doesn't exist, else update)
    try { await Interval.update({ endpoint }, { endpoint, url, interval }, { upsert : true }); }
    catch (err) { console.log(err); }
  },
  
  // Creates intervals for each endpoint in Intervals collectio
  // May be used when server restarts and intervals should start again
  restartIntervals: async function () {    
    // Get all endpoints
    const endpointsToRestart = await Interval.find({});
    
    // Restart endpoints
    endpointsToRestart.forEach(endpoint => this.startScrapeInterval(endpoint.endpoint, endpoint.interval));
  }
}



module.exports = crawlerController;