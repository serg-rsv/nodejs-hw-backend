const { randomUUID } = require('crypto');

const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

const { User } = require('../../models');
const { RequestError, sendEmail } = require('../../helpers');

const signupUser = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, 'Email in use');
  }
  const hashPassword = bcrypt.hashSync(password, 10);
  const avatarURL = gravatar.url(email, { s: '250', r: 'x', d: 'mp' });
  const verificationToken = randomUUID();
  const newUser = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: 'Signup verification',
    html: `Please confirm your email address.
    <br>
    <a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Verify now</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL,
    },
  });
};

module.exports = signupUser;
