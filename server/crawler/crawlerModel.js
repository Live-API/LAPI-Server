const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017', {
  useMongoClient: true,
});

mongoose.Promise = global.Promise;

const INTERVAL = 60;

const crawlerSchema = new Schema({
  endpoint: {type: String, required: true}, // config file
  scrape_date: {type: Date, default: Date.now(), required: true},
  data: {type: Object, required: true}, // crawler
  interval: {type: Number, default: INTERVAL, required: true}, // Amount of time between scrapes, in seconds
});

module.exports = mongoose.model("Crawler", crawlerSchema);