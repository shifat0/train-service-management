import { UserCollection } from "../models/user.model.js";
import {
  conflictError,
  errorResponse,
  successResponse,
  cookieResponse,
} from "../utils/responseHandler.js";
import bcrypt from "bcrypt";

// Sign up user controller
export async function signUpUserController(req, res, next) {
  try {
    const { email, password } = req.body;

    // Existing User
    const existingUser = await UserCollection.findOne({ email });
    if (existingUser?.verified) return conflictError(res, "User");

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating new user in DB
    const newUser = await new UserCollection({
      ...req.body,
      password: hashedPassword,
    }).save();

    return successResponse(res, "User registration complete", newUser, 201);
  } catch (error) {
    next(error);
  }
}

// User login controller
export async function userLoginController(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await UserCollection.findOne({ email: email });
    if (!user) return errorResponse(res, "Wrong email or password!", 404);

    // Compare with hash password of user
    const authenticatedUser = await bcrypt.compare(password, user.password);
    if (!authenticatedUser)
      return errorResponse(res, "Wrong email or password!", 404);

    // Generate access token
    const accessToken = await user.generateAccessToken();
    if (!accessToken)
      return errorResponse(res, "Error generating accessToken!");

    // Send response
    cookieResponse(res, "accessToken", accessToken);
    return successResponse(res, "Logged in Successfully");
  } catch (error) {
    next(err);
  }
}
