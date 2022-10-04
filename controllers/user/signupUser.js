const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

const { User } = require('../../models');
const { RequestError } = require('../../helpers');

const signupUser = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, 'Email in use');
  }
  const hashPassword = bcrypt.hashSync(password, 10);
  const avatarURL = gravatar.url(email, { s: '100', r: 'x', d: 'mp' });
  const newUser = await User.create({
    email,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL,
    },
  });
};

module.exports = signupUser;
