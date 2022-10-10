const signupUser = require('./signupUser');
const verifyEmail = require('./verifyEmail');
const loginUser = require('./loginUser');
const logoutUser = require('./logoutUser');
const currentUser = require('./currentUser');
const updateSubscription = require('./updateSubscription');
const updateAvatarURL = require('./updateAvatarURL');

module.exports = {
  signupUser,
  verifyEmail,
  loginUser,
  logoutUser,
  currentUser,
  updateSubscription,
  updateAvatarURL,
};
