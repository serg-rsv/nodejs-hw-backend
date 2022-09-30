const express = require('express');

const { ctrlWrapper } = require('../../helpers');
const { isValidId, schemaJoiValidator } = require('../../validators');
const { schemasJoiContact } = require('../../models');
const { ctrlContact: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getContacts));
router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getContactById));
router.post(
  '/',
  schemaJoiValidator(schemasJoiContact.addSchema),
  ctrlWrapper(ctrl.addContact)
);
router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeContact));
router.put(
  '/:contactId',
  isValidId,
  schemaJoiValidator(schemasJoiContact.addSchema),
  ctrlWrapper(ctrl.updateContact)
);
router.patch(
  '/:contactId/favorite',
  isValidId,
  schemaJoiValidator(schemasJoiContact.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
