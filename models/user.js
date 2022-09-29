const { Schema, model } = require('mongoose');
const Joi = require('joi');

const userSchema = new Schema({});

const User = model('user', userSchema);

const userSignupSchema = Joi.object({});

const userLoginSchema = Joi.object({});

const schemasJoiUser = {
  userSignupSchema,
  userLoginSchema,
};

module.exports = {
  User,
  schemasJoiUser,
};
