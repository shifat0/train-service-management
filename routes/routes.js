import { Router } from "express";
import authRouter from "./authRouter.js";
import stationRouter from "./stationRouter.js";
import trainRouter from "./trainRouter.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/station", stationRouter);
router.use("/train", trainRouter);

export default router;
