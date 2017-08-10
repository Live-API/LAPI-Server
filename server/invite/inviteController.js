const Invite = require('./inviteModel');

const inviteController = {};

inviteController.createInvite = async (req, res, next) => {
  // Create a new invite and save the id
  try { res.locals.invite = { id: (await Invite.create({}))._id } }
  // Else pass along the error
  catch (err) { res.locals.invite = { err }}
  next();
}

module.exports = inviteController;
