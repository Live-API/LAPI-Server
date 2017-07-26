const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('localhost:27017');

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

userSchema.pre('save', function(next, done) {
  this.password = bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
  next();
});

module.exports = mongoose.model('User', userSchema);
