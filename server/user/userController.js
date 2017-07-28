const User = require('./userModel');
const bcrypt = require('bcryptjs');

const userController = {};

/**
* createUser - create a new User model and then save the user to the database.
*/
userController.createUser = async (req, res, next) => {
  // Create a user
  try {
    const user = new User({
      username: res.locals.username,
      password: res.locals.password
    });
    
    if (res.locals.admin !== undefined) user.admin = res.locals.admin;
    
    // bcrypt being done in mongoose middleware in userModel
    res.locals.userid = (await user.save())._id;
    next();
  } catch (err) {
    // Send an error message
    console.log('failure!', err);
    res.send(err);
  }
};

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*/
userController.verifyUser = (req, res, next) => {
  // Query db for username in req body
  User.findOne({ username: req.body.username }, (err, user) => {
    // If it exists continue
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.locals.userid = user._id;
      next(); 
    }
    // Else send an error message
    else {
      res.send('Incorrect username or password');
    }
  });
};

module.exports = userController;
