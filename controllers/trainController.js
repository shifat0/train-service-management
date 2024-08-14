import mongoose from "mongoose";
import { TrainCollection } from "../models/train.model.js";
import {
  conflictError,
  deleteResponse,
  errorResponse,
  getResponse,
  notFoundErrorResponse,
  postResponse,
  updateResponse,
} from "../utils/responseHandler.js";
import { StationCollection } from "../models/station.model.js";

const ObjectId = mongoose.Types.ObjectId;

// Create Train
export async function createTrainController(req, res, next) {
  try {
    const { name, stops } = req.body;

    const existingTrain = await TrainCollection.findOne({ name });
    if (existingTrain) return conflictError(res, `${name} Train`);

    for (const stop of stops) {
      if (!mongoose.Types.ObjectId.isValid(stop.station))
        return errorResponse(res, "Invalid Station ObjectId", 400);

      const stationExists = await StationCollection.findById(stop.station);
      if (!stationExists) return notFoundErrorResponse(res, "Station with Id");
    }

    const train = await new TrainCollection(req.body).save();

    postResponse(res, train, "Train");
  } catch (error) {
    next(error);
  }
}

// Get All Trains
export async function getTrainsController(req, res, next) {
  try {
    const Trains = await TrainCollection.find().populate({
      path: "stops.station",
      select: "name location -_id",
    });

    getResponse(res, Trains, "Trains");
  } catch (error) {
    next(error);
  }
}

// Get Single Train By Id
export async function getTrainByIdController(req, res, next) {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id))
      return errorResponse(res, "Invalid ObjectId", 400);

    const train = await TrainCollection.findById(id).populate({
      path: "stops.station",
      select: "name location -_id",
    });
    if (!train) return notFoundErrorResponse(res, "Train");

    return getResponse(res, train, "Train");
  } catch (error) {
    next(error);
  }
}

// Update Train
export async function updateTrainController(req, res, next) {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id))
      return errorResponse(res, "Invalid ObjectId", 400);

    const updatedTrain = await TrainCollection.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    updateResponse(res, updatedTrain, "Train");
  } catch (error) {
    next(error);
  }
}

// Delete Train
export async function deleteTrainController(req, res, next) {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id))
      return errorResponse(res, "Invalid ObjectId", 400);

    const deletedTrain = await TrainCollection.findByIdAndDelete(id);
    deleteResponse(res, deletedTrain, "Train");
  } catch (error) {
    next(error);
  }
}
