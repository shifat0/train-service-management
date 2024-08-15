import { Router } from "express";
import {
  addFundsController,
  getWalletBalanceController,
} from "../controllers/wallet.controller.js";
import requestValidator from "../middlewares/requestValidator.js";
import { addFundsSchemaValidator } from "../validators/wallet.validator.js";

const walletRouter = Router();

walletRouter
  .route("/add-fund")
  .post(requestValidator(addFundsSchemaValidator), addFundsController);

walletRouter.route("/:userId").get(getWalletBalanceController);

export default walletRouter;
