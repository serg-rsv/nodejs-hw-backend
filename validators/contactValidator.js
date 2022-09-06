const Joi = require('joi');

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({
        message: validationResult.error.details[0].message,
      });
    }

    next();
  },
};
