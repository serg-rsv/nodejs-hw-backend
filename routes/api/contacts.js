const express = require('express');

const { ctrlWrapper } = require('../../helpers');
const { isValidId, contactValidator } = require('../../validators');
const { schemasJoiContact } = require('../../models');
const ctrl = require('../../controllers/contact');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getContacts));
router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getContactById));
router.post(
  '/',
  contactValidator(schemasJoiContact.addSchema),
  ctrlWrapper(ctrl.addContact)
);
router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeContact));
router.put(
  '/:contactId',
  isValidId,
  contactValidator(schemasJoiContact.addSchema),
  ctrlWrapper(ctrl.updateContact)
);
router.patch(
  '/:contactId/favorite',
  isValidId,
  contactValidator(schemasJoiContact.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
