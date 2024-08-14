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

async function validateStopStation(stops) {
  for (const stop of stops) {
    if (!mongoose.Types.ObjectId.isValid(stop.station))
      return errorResponse(res, "Invalid Station ObjectId", 400);

    const stationExists = await StationCollection.findById(stop.station);
    if (!stationExists) return notFoundErrorResponse(res, "Station with Id");
  }
}

// Create Train
export async function createTrainController(req, res, next) {
  try {
    const { name, stops } = req.body;

    const existingTrain = await TrainCollection.findOne({ name });
    if (existingTrain) return conflictError(res, `${name} Train`);

    await validateStopStation(stops);

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

    const { name, stops } = req.body;

    await validateStopStation(stops);

    const train = await TrainCollection.findById(id);
    if (!train) return notFoundErrorResponse(res, "Train");

    // Update the train name
    if (name) {
      train.name = name;
    }

    for (const stop of stops) {
      const { station, arrivalTime, departureTime } = stop;

      // Check if stop with the same station ID already exists
      const existingStop = train.stops.find(
        (stop) => stop.station.toString() === station
      );

      if (existingStop) {
        await TrainCollection.updateOne(
          { _id: id, "stops.station": station },
          {
            $set: {
              "stops.$.arrivalTime": arrivalTime,
              "stops.$.departureTime": departureTime,
            },
          }
        );
      } else {
        await TrainCollection.findByIdAndUpdate(id, {
          $addToSet: { stops: stop },
        });
      }
    }

    // Re-fetch the updated train with populated stops
    const updatedTrain = await TrainCollection.findById(id).populate({
      path: "stops.station",
      select: "name location -_id",
    });

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

// Delete Train
export async function deleteTrainStopController(req, res, next) {
  try {
    const id = req.params.id;
    const station = req.params.station;
    if (!ObjectId.isValid(id))
      return errorResponse(res, "Invalid ObjectId", 400);
    if (!ObjectId.isValid(station))
      return errorResponse(res, "Invalid ObjectId", 400);

    const train = await TrainCollection.findById(id);
    if (!train) return notFoundErrorResponse(res, "Train");

    await TrainCollection.updateOne(
      { _id: id },
      { $pull: { stops: { station: station } } }
    );

    const updatedTrain = await TrainCollection.findById(id).populate({
      path: "stops.station",
      select: "name location -_id",
    });
    deleteResponse(res, updatedTrain, "Train Stop");
  } catch (error) {
    next(error);
  }
}
