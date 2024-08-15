import mongoose from "mongoose";
import { UserCollection } from "../models/user.model.js";
import WalletCollection from "../models/wallet.model.js";
import {
  errorResponse,
  notFoundErrorResponse,
  successResponse,
} from "../utils/responseHandler.js";

const ObjectId = mongoose.Types.ObjectId;

export async function addFundsController(req, res, next) {
  try {
    const { userId, amount, type } = req.body;

    if (!ObjectId.isValid(userId))
      return errorResponse(res, "Invalid userId", 400);

    const user = await UserCollection.findById(userId);
    if (!user) return notFoundErrorResponse(res, "User");

    // Update operation
    const update = {
      $inc: { balance: type === "credit" ? amount : -amount },
      $push: {
        transactions: {
          amount,
          type,
          date: new Date(),
        },
      },
    };

    // Perform the upsert operation
    const wallet = await WalletCollection.findOneAndUpdate({ userId }, update, {
      new: true,
      upsert: true,
    });

    const lastTransactionId =
      wallet.transactions[wallet.transactions.length - 1]._id;

    // Check if balance is sufficient for debit operations after the upsert operation
    if (type === "debit" && wallet.balance < 0) {
      // Rollback the operation
      await WalletCollection.findOneAndUpdate(
        { userId },
        {
          $inc: { balance: amount },
          $pull: { transactions: { _id: lastTransactionId } },
        },
        { new: true }
      );
      return errorResponse(res, "Insufficient balance", 400);
    }

    // Creating payload
    const payload = {
      balance: wallet.balance,
      transactions: wallet.transactions,
    };

    successResponse(res, "Transaction successfull", payload, 201);
  } catch (error) {
    next(error);
  }
}
