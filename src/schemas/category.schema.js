const joi = require('joi');

const categorySchema = joi.object({
  name: joi.string().required().messages({
    'string.empty': '"name" is required',
    'any.required': '"name" is required',
  }),
});

module.exports = categorySchema;