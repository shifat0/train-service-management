import mongoose from "mongoose";

const stopSchema = new mongoose.Schema(
  {
    station: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "station",
    },
    arrivalTime: String,
    departureTime: String,
  },
  { _id: false }
);

const trainSchema = new mongoose.Schema(
  {
    name: String,
    stops: [stopSchema],
  },
  { timestamps: true }
);

export const TrainCollection = mongoose.model("train", trainSchema);
