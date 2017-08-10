const Invite = require('./inviteModel');

const inviteController = {};

// Generates an invite ID
inviteController.createInvite = async (req, res, next) => {
  // Create a new invite and save the id
  try { res.locals.invite = { id: (await Invite.create({ creator: res.locals.userId }))._id } }
  // Else pass along the error
  catch (err) { res.locals.invite = { err }}
  next();
}

// Updates invite with redeemer's ID
inviteController.redeemInvite = async (req, res, next) => {
  // Update invite
  try { await Invite.findByIdAndUpdate(res.locals.invite, { redeemer: res.locals.userid }); next() }
  // Else pass along error
  catch (err) { res.status(500).send() }
}

// Checks if the current invite ID is valid
inviteController.verifyInvite = async (req, res, next) => {
  try {
    // If invite exists and is valid and is not yet redeemed
    const invite = await Invite.findById(res.locals.inviteId);
    if (invite && invite.valid && !invite.redeemer) next();
    // Else respond with error status
    else res.status(401).send('Invalid or expired invite')
  }
  catch (err) {
    console.log(err);
    res.status(401);
    res.send('Invalid or expired invite')
  }
};

module.exports = inviteController;
