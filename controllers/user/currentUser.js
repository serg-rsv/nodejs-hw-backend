const { User } = require('../../models');

const currentUser = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);

  res.json({
    email: user.email,
    subscription: user.subscription,
  });
};

module.exports = currentUser;
