const model = require('../models/contacts');

const getContacts = async (_, res) => {
  const contacts = await model.listContacts();

  res.status(200).json(contacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await model.getContactById(contactId);

  if (!contact) {
    return res.status(200).json({ message: 'Not contact found' });
  }

  res.status(200).json(contact);
};

const addContact = async (req, res) => {
  const { body } = req;
  const newContact = await model.addContact(body);

  res.status(201).json(newContact);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const isRemoved = await model.removeContact(contactId);

  if (isRemoved) {
    res.status(200).json({ message: 'contact deleted' });
  } else {
    res.status(200).json({ message: 'Not contact found' });
  }
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;
  const updatedContact = await model.updateContact(contactId, body);

  res.status(200).json(updatedContact);
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
