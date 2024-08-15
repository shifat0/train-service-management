import Joi from "joi";

export const addFundsSchemaValidator = Joi.object({
  userId: Joi.string().required(),
  amount: Joi.number().positive().required(),
  type: Joi.string().valid("credit", "debit").required(),
});
