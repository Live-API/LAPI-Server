const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017', {
  useMongoClient: true,
});

mongoose.Promise = global.Promise;

const intervalSchema = new Schema({
  endpoint: {type: String, required: true},
  url: {type: String, required: true},
  interval: {type: Number, required: true, default: 600000}, // 10 minute by default
});

module.exports = mongoose.model("Interval", intervalSchema);