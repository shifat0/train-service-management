import { Router } from "express";
import { addFundsController } from "../controllers/wallet.controller.js";

const walletRouter = Router();

walletRouter.route("/add-fund").post(addFundsController);

export default walletRouter;
