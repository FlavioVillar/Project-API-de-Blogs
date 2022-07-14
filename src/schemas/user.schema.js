const joi = require('joi');

const displayMessageSchema = '"displayName" length must be at least 8 characters long';
const emailMessageSchema = '"email" must be a valid email';
const passwordMessageSchema = '"password" length must be at least 6 characters long';

const userSchema = joi.object({
  displayName: joi.string().min(8).required().messages({
    'string.empty': displayMessageSchema,
    'string.min': displayMessageSchema,
    'string.required': displayMessageSchema,
  }),
  email: joi.string().email().required().messages({
    'string.empty': emailMessageSchema,
    'string.email': emailMessageSchema,
    'any.required': emailMessageSchema,
  }),
  password: joi.string().min(6).required().messages({
    'string.empty': passwordMessageSchema,
    'string.min': passwordMessageSchema,
    'any.required': passwordMessageSchema,
  }),
  image: joi.string(),
});

module.exports = userSchema;