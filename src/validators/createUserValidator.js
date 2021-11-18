const Joi = require('joi');

const schema = Joi.object({
  id: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().required(),
});

module.exports = schema;
