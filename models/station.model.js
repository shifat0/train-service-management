import mongoose from "mongoose";

const stationSchema = new mongoose.Schema(
  {
    name: String,
    location: String,
  },
  { timestamps: true }
);

export const StationCollection = mongoose.model("station", stationSchema);
