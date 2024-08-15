import { Router } from "express";
import { addFundsController } from "../controllers/wallet.controller.js";
import requestValidator from "../middlewares/requestValidator.js";
import { addFundsSchemaValidator } from "../validators/wallet.validator.js";

const walletRouter = Router();

walletRouter
  .route("/add-fund")
  .post(requestValidator(addFundsSchemaValidator), addFundsController);

export default walletRouter;
