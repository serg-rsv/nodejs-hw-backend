const { Contact } = require('../../models');
const { RequestError } = require('../../helpers');

const removeContact = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const isRemoved = await Contact.findOneAndRemove({
    owner: _id,
    _id: contactId,
  });

  if (!isRemoved) {
    throw RequestError(404, 'Not found');
  }
  res.json({ message: 'contact deleted' });
};

module.exports = removeContact;
