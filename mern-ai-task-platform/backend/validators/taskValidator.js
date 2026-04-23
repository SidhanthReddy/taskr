const Joi = require('joi');

const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  input: Joi.string().min(1).required(),
  operation: Joi.string()
    .valid('uppercase', 'lowercase', 'reverse', 'wordcount')
    .required()
});

module.exports = {
  createTaskSchema
};