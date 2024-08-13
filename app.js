import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
dotenv.config();

// middlewares
app.use(express.json());
app.use(cors({ origin: process.env.WEBSITE_URL, credentials: true }));

// routers
app.get("/", (_, res) => res.send("server is online!"));
app.use(process.env.API, router);

// error handler
app.use(errorHandler);

export default app;
