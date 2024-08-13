import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

userSchema.methods.generateAccessToken = function () {
  const displayName =
    this.firstName.charAt(0).toUpperCase() +
    this.firstName.slice(1) +
    " " +
    this.lastName.charAt(0).toUpperCase() +
    this.lastName.slice(1);

  const payload = {
    _id: this._id.toString(),
    email: this.email,
    displayName,
  };

  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

userSchema.methods.generateForgetPasswordToken = function () {
  return jwt.sign({ email: this.email }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.FORGET_PASSWORD_TOKEN_EXPIRES_IN,
  });
};

export const UserCollection = mongoose.model("user", userSchema);
