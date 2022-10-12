const { User } = require('../../models');
const { RequestError, sendEmail } = require('../../helpers');

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(404, 'User not found');
  }

  if (user.verify) {
    throw RequestError(400, 'Verification has already been passed');
  }

  const mail = {
    to: email,
    subject: 'Signup verification',
    html: `Please confirm your email address.
    <br>
    <a href="http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank">Verify now</a>`,
  };

  await sendEmail(mail);

  res.status(200).json({
    message: 'Verification email sent',
  });
};

module.exports = resendVerifyEmail;
