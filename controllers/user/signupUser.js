const bcrypt = require('bcrypt');

const { User } = require('../../models');
const { RequestError } = require('../../helpers');

const signupUser = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, 'Email in use');
  }
  const hashPassword = bcrypt.hashSync(password, 10);
  const newUser = await User.create({ email, password: hashPassword });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = signupUser;
