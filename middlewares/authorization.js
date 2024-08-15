import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/responseHandler.js";

export default function authorizedUser(req, res, next) {
  let token = req.header("Authorization");
  if (!token)
    return errorResponse(res, "Access denied! No token provided", 401);

  const hasBearer = token.startsWith("Bearer ");
  if (!hasBearer)
    return errorResponse(res, "Access denied! No token provided", 401);

  try {
    const decodedToken = jwt.verify(
      token.split(" ")[1].trim(),
      process.env.JWT_SECRET_KEY
    );

    req.user = decodedToken;
    next();
  } catch (error) {
    next(error);
  }
}
