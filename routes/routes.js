import { Router } from "express";
import authRouter from "./authRouter.js";
import stationRouter from "./stationRouter.js";
import trainRouter from "./trainRouter.js";
import walletRouter from "./walletRouter.js";
import authorizedUser from "../middlewares/authorization.js";
import ticketRouter from "./ticketRouter.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/station", authorizedUser, stationRouter);
router.use("/train", authorizedUser, trainRouter);
router.use("/wallet", authorizedUser, walletRouter);
router.use("/ticket", authorizedUser, ticketRouter);

export default router;
