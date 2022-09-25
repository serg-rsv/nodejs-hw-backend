const express = require('express');

const { ctrlWrapper } = require('../../helpers');
// const { addContactValidation } = require('../../validators/contactValidator');
const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../../controllers');

const router = express.Router();

router.get('/', ctrlWrapper(getContacts));
router.get('/:contactId', ctrlWrapper(getContactById));
router.post('/', ctrlWrapper(addContact));
// router.post('/', addContactValidation, addContact);
router.delete('/:contactId', ctrlWrapper(removeContact));
router.put('/:contactId', ctrlWrapper(updateContact));
// router.put('/:contactId', addContactValidation, updateContact);
router.patch('/:contactId/favorite', ctrlWrapper(updateStatusContact));

module.exports = router;
