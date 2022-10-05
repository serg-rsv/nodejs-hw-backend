const { Contact } = require('../../models');
const { RequestError } = require('../../helpers');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(
    { _id: contactId },
    '-createdAt -updatedAt'
  );

  if (!contact) {
    throw RequestError(404, 'Not found');
  }

  res.json(contact);
};

module.exports = getContactById;
