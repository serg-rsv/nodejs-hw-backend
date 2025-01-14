const { Contact } = require('../../models');

const getContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite = false } = req.query;
  const skip = (page - 1) * limit;
  const query = { owner: _id };

  if (favorite) {
    query.favorite = favorite;
  }

  const contacts = await Contact.find(query, '-createdAt -updatedAt', {
    skip,
    limit: Number(limit),
  });

  res.json(contacts);
};

module.exports = getContacts;
