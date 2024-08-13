import mongoose from "mongoose";
import { StationCollection } from "../models/station.model.js";
import {
  conflictError,
  deleteResponse,
  errorResponse,
  getResponse,
  postResponse,
  successResponse,
  updateResponse,
} from "../utils/responseHandler.js";

const ObjectId = mongoose.Types.ObjectId;

// Create Station
export async function createStationController(req, res, next) {
  try {
    const existingStation = await StationCollection.findOne({
      name: req.body.name,
    });
    if (existingStation) return conflictError(res, "Station");

    const station = await new StationCollection(req.body).save();

    postResponse(res, station, "Station");
  } catch (error) {
    next(error);
  }
}

// Get All Stations
export async function getStationsController(req, res, next) {
  try {
    const stations = await StationCollection.find();

    getResponse(res, stations, "Stations");
  } catch (error) {
    next(error);
  }
}

// Get Single Station By Id
export async function getStationByIdController(req, res, next) {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id))
      return errorResponse(res, "Invalid ObjectId", 400);

    const station = await StationCollection.findById(id);

    return getResponse(res, station, "Station");
  } catch (error) {
    next(error);
  }
}

// Update Station
export async function updateStationController(req, res, next) {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id))
      return errorResponse(res, "Invalid ObjectId", 400);

    const updatedStation = await StationCollection.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    updateResponse(res, updatedStation, "Station");
  } catch (error) {
    next(error);
  }
}

// Delete Station
export async function deleteStationController(req, res, next) {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id))
      return errorResponse(res, "Invalid ObjectId", 400);

    const deletedStation = await StationCollection.findByIdAndDelete(id);
    deleteResponse(res, deletedStation, "Station");
  } catch (error) {
    next(error);
  }
}
