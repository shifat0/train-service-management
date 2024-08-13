import { Router } from "express";
import requestValidator from "../middlewares/requestValidator.js";
import { stationSchemaValidator } from "../validators/station.validator.js";
import {
  createStationController,
  deleteStationController,
  getStationByIdController,
  getStationsController,
  updateStationController,
} from "../controllers/stationController.js";

const stationRouter = Router();

stationRouter
  .route("/")
  .post(requestValidator(stationSchemaValidator), createStationController)
  .get(getStationsController);

stationRouter
  .route("/:id")
  .get(getStationByIdController)
  .put(updateStationController)
  .delete(deleteStationController);

export default stationRouter;
