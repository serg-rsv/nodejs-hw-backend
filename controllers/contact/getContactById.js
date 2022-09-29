const { Contact } = require('../../models');
const { RequestError } = require('../../helpers');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw RequestError(404, 'Not found');
  }

  res.json(contact);
};

module.exports = getContactById;
