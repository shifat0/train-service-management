import Joi from "joi";

export const ticketSchemaValidator = Joi.object({
  userId: Joi.string().required(),
  trainId: Joi.string().required(),
  startStop: Joi.string().required(),
  endStop: Joi.string().required(),
});
