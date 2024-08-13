import { Router } from "express";
import authRouter from "./authRouter.js";
import stationRouter from "./stationRouter.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/station", stationRouter);

export default router;
