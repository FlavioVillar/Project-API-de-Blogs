const Joi = require('joi');

const messageSchema = 'Some required fields are missing';

const postSchema = Joi.object().keys({
  title: Joi.string().required().messages({
    'string.empty': messageSchema,
    'string.required': messageSchema,
  }),
  content: Joi.string().required().messages({
    'string.empty': messageSchema,
    'string.required': messageSchema,
  }),
  categoryIds: Joi.array().items(Joi.number()).required().messages({
    'string.empty': messageSchema,
    'string.required': messageSchema,
  }),
});

const postSchemaByUser = Joi.object().keys({
  title: Joi.string().required().messages({
    'string.empty': messageSchema,
    'string.required': messageSchema,
  }),
  content: Joi.string().required().messages({
    'string.empty': messageSchema,
    'string.required': messageSchema,
  }),
});

module.exports = { postSchema, postSchemaByUser };