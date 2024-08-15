import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  amount: Number,
  type: {
    type: String,
    enum: ["credit", "debit"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const walletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  balance: {
    type: Number,
    default: 0,
  },
  transactions: [transactionSchema],
});

const WalletCollection = mongoose.model("wallet", walletSchema);

export default WalletCollection;
