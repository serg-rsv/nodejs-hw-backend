const express = require('express');

const { ctrlWrapper } = require('../../helpers');
const { ctrlUser: ctrl } = require('../../controllers');
const { schemasJoiUser } = require('../../models');
const { auth, schemaJoiValidator } = require('../../validators');

const router = express.Router();

router.post(
  '/signup',
  schemaJoiValidator(schemasJoiUser.userSignupSchema),
  ctrlWrapper(ctrl.signupUser)
);

router.post(
  '/login',
  schemaJoiValidator(schemasJoiUser.userSignupSchema),
  ctrlWrapper(ctrl.loginUser)
);

router.get('/logout',auth,ctrlWrapper(ctrl.logoutUser));

module.exports = router;
