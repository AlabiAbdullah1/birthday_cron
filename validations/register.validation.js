const joi = require("joi");

exports.registerValidation = joi.object({
  fullName: joi.string().required(),
  email: joi.string().email().required(),
  DOB: joi.date().required(),
});
