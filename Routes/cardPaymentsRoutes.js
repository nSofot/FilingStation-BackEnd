import express from "express";
import { CreateAttendantCardPayments } from "../controllers/cardPaymentsController.js";
import { getPendingAttendentCardPayments } from "../controllers/cardPaymentsController.js";

    
const cardPaymentsRoutes = express.Router();

cardPaymentsRoutes.post("/", CreateAttendantCardPayments);
cardPaymentsRoutes.get("/:attendantId", getPendingAttendentCardPayments);


export default cardPaymentsRoutes;
