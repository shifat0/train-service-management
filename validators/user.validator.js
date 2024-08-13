import Joi from "joi";

export const userSchemaValidator = Joi.object({
  firstName: Joi.string().required("First Name is required!"),
  lastName: Joi.string().required("Last Name is required!"),
  email: Joi.string().email().required("Email is required!"),
  password: Joi.string()
    .min(6)
    .max(18)
    .regex(/^[a-zA-Z0-9]/, "password must contain a uppercase letter, a number")
    .required("password is required!"),
  confirmPassword: Joi.ref("password"),
});
