import Joi from "joi";

const stopSchema = Joi.object({
  station: Joi.string().required(),
  arrivalTime: Joi.string().required(),
  departureTime: Joi.string().required(),
});

export const trainSchemaValidator = Joi.object({
  name: Joi.string().required(),
  stops: Joi.array().items(stopSchema).min(1).required(),
});
