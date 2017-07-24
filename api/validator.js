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

const emailSchema = Joi.object().keys({
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
  numberOfGift: Joi.number().integer()
});

const validateParticipant = data => Joi.validate(data, participantSchema, { allowUnknown: true });

const validate = data => Joi.validate(data, emailSchema, { allowUnknown: true });

module.exports = { validateParticipant, validate };
