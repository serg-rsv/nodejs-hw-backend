const express = require('express');

const { auth } = require('../../middlewares');
const { ctrlWrapper } = require('../../helpers');
const { ctrlUser: ctrl } = require('../../controllers');
const { schemasJoiUser } = require('../../models');
const { schemaJoiValidator } = require('../../validators');

const router = express.Router();

router.post(
  '/signup',
  schemaJoiValidator(schemasJoiUser.userSignupSchema),
  ctrlWrapper(ctrl.signupUser)
);

router.post(
  '/login',
  schemaJoiValidator(schemasJoiUser.userLoginSchema),
  ctrlWrapper(ctrl.loginUser)
);

router.get('/logout', auth, ctrlWrapper(ctrl.logoutUser));

router.get('/current', auth, ctrlWrapper(ctrl.currentUser));

router.patch(
  '/',
  auth,
  schemaJoiValidator(schemasJoiUser.userUpdateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
