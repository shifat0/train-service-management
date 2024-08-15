import { Router } from "express";
import { purchaseTicketController } from "../controllers/ticketController.js";
import requestValidator from "../middlewares/requestValidator.js";
import { ticketSchemaValidator } from "../validators/ticket.validator.js";

const ticketRouter = Router();

ticketRouter
  .route("/purchase")
  .post(requestValidator(ticketSchemaValidator), purchaseTicketController);

export default ticketRouter;
