const { Contact } = require('../models');
const { RequestError } = require('../helpers');

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  if (!updatedContact) {
    throw RequestError(404, 'Not found');
  }
  res.json(updatedContact);
};

module.exports = updateContact;
