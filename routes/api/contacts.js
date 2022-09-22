const express = require('express');

const { addContactValidation } = require('../../validators/contactValidator');
const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../controllers/contactsController');

const router = express.Router();

router.get('/', getContacts);
router.get('/:contactId', getContactById);
router.post('/', addContactValidation, addContact);
router.delete('/:contactId', removeContact);
router.put('/:contactId', addContactValidation, updateContact);

module.exports = router;
