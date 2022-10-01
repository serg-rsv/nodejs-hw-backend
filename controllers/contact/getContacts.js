const { Contact } = require('../../models');

const getContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner: _id }, '-createdAt -updatedAt', {
    skip,
    limit: Number(limit),
  });
  res.json(contacts);
};

module.exports = getContacts;
