const express = require('express');

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
  schemaJoiValidator(schemasJoiUser.userSignupSchema),
  ctrlWrapper(ctrl.loginUser)
);

module.exports = router;
