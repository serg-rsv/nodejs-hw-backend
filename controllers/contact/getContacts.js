const { Contact } = require('../../models');

const getContacts = async (req, res) => {
  const { _id } = req.user;
  const contacts = await Contact.find({ owner: _id }, '-createdAt -updatedAt');
  res.json(contacts);
};

module.exports = getContacts;
