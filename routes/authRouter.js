import { Router } from "express";
import {
  signUpUserController,
  userLoginController,
} from "../controllers/authController.js";
import requestValidator from "../middlewares/requestValidator.js";
import { userSchemaValidator } from "../validators/user.validator.js";

const authRouter = Router();

authRouter
  .route("/register")
  .post(requestValidator(userSchemaValidator), signUpUserController);

authRouter.route("/login").post(userLoginController);

export default authRouter;
