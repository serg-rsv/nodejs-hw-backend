const { User } = require('../../models');
const { RequestError } = require('../../helpers');

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw RequestError(400, 'User not found');
  }

  if (user.verify) {
    throw RequestError(400, 'Email is already verified');
  }

  user.verify = true;
  user.verificationToken = null;
  await user.save();

  res.json({
    message: 'Verification successful',
  });
};

module.exports = verifyEmail;
