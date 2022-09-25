const { Contact } = require('../models');
const { RequestError } = require('../helpers');

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const isRemoved = await Contact.findByIdAndRemove(contactId);

  if (!isRemoved) {
    throw RequestError(404, 'Not found');
  }
  res.json({ message: 'contact deleted' });
};

module.exports = removeContact;
