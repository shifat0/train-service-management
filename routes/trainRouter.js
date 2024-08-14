import { Router } from "express";
import requestValidator from "../middlewares/requestValidator.js";
import { trainSchemaValidator } from "../validators/train.validator.js";
import {
  createTrainController,
  deleteTrainController,
  getTrainByIdController,
  getTrainsController,
} from "../controllers/trainController.js";

const trainRouter = Router();

trainRouter
  .route("/")
  .post(requestValidator(trainSchemaValidator), createTrainController)
  .get(getTrainsController);

trainRouter
  .route("/:id")
  .get(getTrainByIdController)
  .delete(deleteTrainController);

export default trainRouter;
