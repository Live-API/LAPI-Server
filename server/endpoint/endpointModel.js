const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017', {
  useMongoClient: true,
});

mongoose.Promise = global.Promise;

// Definition data from endpoint creation POST
//{
//  url: Starting URL of scrape
//  interval: Time between scrapes in seconds, used in IntervalModel
//  endpoint: Unique name of the endpoint and where the data can be retrieved from
//  text: Object of elements to scrape (e.g. {name: [...DOM paths]})
//  images: Object of images to scrape
//  backgroundImages: Object of background images to scrape
//  pagination: Button to press after scraping a page
//}

const endpointSchema = new Schema({
  endpoint: {type: String, required: true, unique: true},
  creator: {type: String},
  url: {type: String, default: Date.now(), required: true},
  text: {type: Object, required: false},
  images: {type: Object, required: false},
  backgroundImages: {type: Object, required: false},
  pagination: {type: Object, required: false},
});

module.exports = mongoose.model("Endpoint", endpointSchema);
