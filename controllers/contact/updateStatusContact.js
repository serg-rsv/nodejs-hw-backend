const { Contact } = require('../../models');
const { RequestError } = require('../../helpers');

const updateStatusContact = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const { body } = req;
  const updatedContact = await Contact.findOneAndUpdate(
    { owner: _id, _id: contactId },
    body,
    {
      new: true,
      fields: ['-createdAt', '-updatedAt'],
    }
  );

  if (!updatedContact) {
    throw RequestError(404, 'Not found');
  }
  res.json(updatedContact);
};

module.exports = updateStatusContact;
