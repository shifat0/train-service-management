import { Router } from "express";
import requestValidator from "../middlewares/requestValidator.js";
import { trainSchemaValidator } from "../validators/train.validator.js";
import {
  createTrainController,
  deleteTrainController,
  deleteTrainStopController,
  getTrainByIdController,
  getTrainsController,
  updateTrainController,
} from "../controllers/trainController.js";

const trainRouter = Router();

trainRouter
  .route("/")
  .post(requestValidator(trainSchemaValidator), createTrainController)
  .get(getTrainsController);

trainRouter
  .route("/:id")
  .get(getTrainByIdController)
  .put(requestValidator(trainSchemaValidator), updateTrainController)
  .delete(deleteTrainController);

trainRouter.route("/:id/stops/:station").delete(deleteTrainStopController);

export default trainRouter;
