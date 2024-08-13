import jwt from "jsonwebtoken";

export default function (req, res, next) {
  let token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied! No token provided" });

  const hasBearer = token.startsWith("Bearer ");
  if (!hasBearer)
    return res
      .status(401)
      .json({ message: "Access denied! No token provided" });

  try {
    const decodedToken = jwt.verify(
      token.split(" ")[1].trim(),
      process.env.JWT_SECRET_KEY
    );

    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }
}
