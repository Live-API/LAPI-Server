const Session = require('./sessionModel');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*
*
*/
sessionController.isLoggedIn = async (req, res, next) => {
  
  // If session exists for current ssid and if the session is not expired
    // Call next
  
  if (await Session.findOne({cookieId: req.cookies.sid})) next();
  
  // Else
    // Redirect to signup
  else res.redirect('/signup');

};

/**
* startSession - create a new Session model and then save the new session to the
* database.
*
*
*/
sessionController.startSession = async (req, res, next) => {
  try {
    // Save the ssid cookie to the db as a new session model instance
    const session = new Session({cookieId: res.locals.userId});
    res.cookie('sid', await session.save()._id);
    next();
  }
  catch (err) {
    console.log('Error starting session', err)
    res.status(500);
    res.send();
  }
};

module.exports = sessionController;
