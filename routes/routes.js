import { Router } from "express";
import authRouter from "./authRouter.js";
import stationRouter from "./stationRouter.js";
import trainRouter from "./trainRouter.js";
import walletRouter from "./walletRouter.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/station", stationRouter);
router.use("/train", trainRouter);
router.use("/wallet", walletRouter);

export default router;
