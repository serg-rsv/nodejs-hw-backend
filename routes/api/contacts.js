const express = require('express');

const { ctrlWrapper } = require('../../helpers');
const { auth, isValidId, schemaJoiValidator } = require('../../validators');
const { schemasJoiContact } = require('../../models');
const { ctrlContact: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', auth, ctrlWrapper(ctrl.getContacts));
router.get('/:contactId', auth, isValidId, ctrlWrapper(ctrl.getContactById));
router.post(
  '/',
  auth,
  schemaJoiValidator(schemasJoiContact.addSchema),
  ctrlWrapper(ctrl.addContact)
);
router.delete('/:contactId', auth, isValidId, ctrlWrapper(ctrl.removeContact));
router.put(
  '/:contactId',
  auth,
  isValidId,
  schemaJoiValidator(schemasJoiContact.addSchema),
  ctrlWrapper(ctrl.updateContact)
);
router.patch(
  '/:contactId/favorite',
  auth,
  isValidId,
  schemaJoiValidator(schemasJoiContact.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
