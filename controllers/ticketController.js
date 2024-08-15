import mongoose from "mongoose";
import { UserCollection } from "../models/user.model.js";
import { TrainCollection } from "../models/train.model.js";
import { StationCollection } from "../models/station.model.js";
import WalletCollection from "../models/wallet.model.js";
import { TicketCollection } from "../models/ticket.model.js";
import {
  errorResponse,
  notFoundErrorResponse,
  successResponse,
} from "../utils/responseHandler.js";

const ObjectId = mongoose.Types.ObjectId;

export async function purchaseTicketController(req, res, next) {
  try {
    const { userId, trainId, startStop, endStop } = req.body;

    if (
      !ObjectId.isValid(userId) ||
      !ObjectId.isValid(trainId) ||
      !ObjectId.isValid(startStop) ||
      !ObjectId.isValid(endStop)
    ) {
      return errorResponse(res, "Invalid IDs provided", 400);
    }

    const user = await UserCollection.findById(userId);
    if (!user) return notFoundErrorResponse(res, "User");

    const train = await TrainCollection.findById(trainId).populate(
      "stops.station"
    );
    if (!train) return notFoundErrorResponse(res, "Train");

    const startStation = await StationCollection.findById(startStop);
    const endStation = await StationCollection.findById(endStop);
    if (!startStation || !endStation)
      return notFoundErrorResponse(res, "Station");

    const startIndex = train.stops.findIndex(
      (stop) => stop.station._id.toString() === startStop
    );
    const endIndex = train.stops.findIndex(
      (stop) => stop.station._id.toString() === endStop
    );

    if (startIndex === -1 || endIndex === -1)
      return errorResponse(res, "Invalid stop order", 400);

    let fare; // Assuming fare 20 units per stop

    if (startIndex >= endIndex) fare = (startIndex - endIndex) * 20;
    else fare = (endIndex - startIndex) * 20;

    if (fare <= 0)
      return errorResponse(res, "Fare can't be 0 or smaller than 0");

    // Check wallet balance
    let wallet = await WalletCollection.findOne({ userId });
    if (!wallet) return notFoundErrorResponse(res, "User wallet");
    if (wallet.balance < fare) {
      return errorResponse(res, "Insufficient balance", 400);
    }

    // Update wallet balance and add transaction
    wallet.balance -= fare;
    wallet.transactions.push({
      amount: fare,
      type: "debit",
      date: new Date(),
    });
    await wallet.save();

    // Create the ticket
    const ticket = new TicketCollection({
      userId,
      trainId,
      startStop,
      endStop,
      fare,
    });
    await ticket.save();

    const payload = {
      ticket,
      balance: wallet.balance,
    };

    successResponse(res, "Ticket purchased successfully", payload, 201);
  } catch (error) {
    next(error);
  }
}
