import mongoose from "mongoose";
import app from "./app.js";

// databse connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to database"))
  .catch((error) =>
    console.log(`${error.message}. database connection failed!)`)
  );

// listening to server
app.listen(process.env.PORT, () => console.log("server is online!"));
