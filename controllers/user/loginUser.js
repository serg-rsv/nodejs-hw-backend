const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require('../../models');
const { RequestError } = require('../../helpers');

const { SECRET_JWT } = process.env;

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw RequestError(401, 'Email or password is wrong');
  }

  const token = jwt.sign({ id: user._id }, SECRET_JWT);

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = loginUser;
