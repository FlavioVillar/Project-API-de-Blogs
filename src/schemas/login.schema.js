const joi = require('joi');

const messageSchema = 'Some required fields are missing';

const loginSchema = joi.object().keys({
  email: joi.string().email().required().messages({
    'string.empty': messageSchema,
    'string.email': messageSchema,
    'any.required': messageSchema,
  }),
  password: joi.string().required().messages({
    'string.empty': messageSchema,
    'any.required': messageSchema,
  }),
});

module.exports = { loginSchema };