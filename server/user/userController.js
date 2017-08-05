const User = require('./userModel');
const bcrypt = require('bcryptjs');

const userController = {};

/**
* createUser - create a new User model and then save the user to the database.
*/
userController.createUser = async (req, res, next) => {
  // Create a user
  try {
    // If there is a user to create
    if (res.locals.newUser) {
      const user = new User(res.locals.newUser);

      // bcrypt being done in mongoose middleware in userModel
      res.locals.userid = (await user.save())._id;
    }
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
      res.locals.userId = user._id;
      next(); 
    }
    // Else send an error message
    else {
      res.send('Incorrect username or password');
    }
  });
};

/**
* Checks if this is the first admin to be created
* If so, then parses the body as an admin user
* Else, returns an error
*/
userController.checkFirstUser = async (req, res, next) => {
  // If an admin already exists, return false
  if (await User.findOne({ admin: true }) !== null) {
    res.locals.newUser = false;
    next();
  }
  else {
    res.locals.newUser = {
      username: req.body.username,
      password: req.body.password,
      admin: true,
    }
    next();
  }
}

module.exports = userController;
