const Joi = require('joi');

const participantSchema = Joi.object().keys({
  name: Joi
    .string()
    .min(2)
    .max(200)
    .required(),
  email: Joi
    .string()
    .email()
    .required()
});

const allDataSchema = Joi.object().keys({
  subject: Joi
    .string()
    .min(4)
    .max(200)
    .required(),
  from: Joi
    .string()
    .email()
    .required(),
  body: Joi
    .string()
    .min(4)
    .max(200)
    .required(),
  participants: Joi.array().items(participantSchema),
  quantity: Joi.number().integer()
});


const validateData = data => Joi.validate(data, allDataSchema, { allowUnknown: true, abortEarly: false });

module.exports = validateData;
