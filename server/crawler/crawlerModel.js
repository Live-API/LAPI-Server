const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('localhost:27017');

const crawlerSchema = new Schema({
    endpoint: {type: String, required: true}, // config file
    scrape_date: {type: Date, default: Date.now(), required: true},
    data: {type: Object, required: true} // crawler
});

module.exports = mongoose.model("Crawler", crawlerSchema);