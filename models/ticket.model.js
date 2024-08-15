import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  trainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "train",
  },
  startStop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "station",
  },
  endStop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "station",
  },
  fare: Number,
  purchaseDate: { type: Date, default: Date.now },
});

export const TicketCollection = mongoose.model("ticket", ticketSchema);
