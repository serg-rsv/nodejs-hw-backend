const { Contact } = require('../../models');
const { RequestError } = require('../../helpers');

const getContactById = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const contact = await Contact.findOne(
    { owner: _id, _id: contactId },
    '-createdAt -updatedAt'
  );

  if (!contact) {
    throw RequestError(404, 'Not found');
  }

  res.json(contact);
};

module.exports = getContactById;
