const { Contact } = require('../../models');

const getContacts = async (_, res) => {
  const contacts = await Contact.find({});
  res.json(contacts);
};

module.exports = getContacts;
