const signupUser = require('./signupUser');
const loginUser = require('./loginUser');
const logoutUser = require('./logoutUser');
const currentUser = require('./currentUser');
const updateSubscription = require('./updateSubscription');
const updateAvatarURL = require('./updateAvatarURL');

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  currentUser,
  updateSubscription,
  updateAvatarURL,
};
