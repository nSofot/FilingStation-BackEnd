import express from "express";
import { CreateAttendantCardPayments } from "../controllers/cardPaymentsController.js";
import { getPendingAttendentCardPayments } from "../controllers/cardPaymentsController.js";
import { updateCardPaymentIsCompleted } from "../controllers/cardPaymentsController.js";
import { getAllCardPaymentVouchers } from "../controllers/cardPaymentsController.js";

    
const cardPaymentsRoutes = express.Router();

cardPaymentsRoutes.post("/", CreateAttendantCardPayments);
cardPaymentsRoutes.get("/:attendantId", getPendingAttendentCardPayments);
cardPaymentsRoutes.get("/", getAllCardPaymentVouchers);
cardPaymentsRoutes.put("/complete/:receiptId", updateCardPaymentIsCompleted);


export default cardPaymentsRoutes;
