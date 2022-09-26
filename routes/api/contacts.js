const express = require('express');

const { ctrlWrapper } = require('../../helpers');
const { isValidId, contactValidator } = require('../../validators');
const { schemas } = require('../../models');
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
router.get('/:contactId', isValidId, ctrlWrapper(getContactById));
router.post('/', contactValidator(schemas.addSchema), ctrlWrapper(addContact));
router.delete('/:contactId', isValidId, ctrlWrapper(removeContact));
router.put(
  '/:contactId',
  isValidId,
  contactValidator(schemas.addSchema),
  ctrlWrapper(updateContact)
);
router.patch(
  '/:contactId/favorite',
  isValidId,
  contactValidator(schemas.updateFavoriteSchema),
  ctrlWrapper(updateStatusContact)
);

module.exports = router;
