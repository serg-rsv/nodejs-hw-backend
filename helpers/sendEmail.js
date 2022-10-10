const sgMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY, SENDGRID_MAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (mail) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await sgMail.send({ ...mail, from: SENDGRID_MAIL });
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
