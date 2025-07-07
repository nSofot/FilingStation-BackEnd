import express from "express";
import { CreateAttCashPayments } from "../controllers/attCashPaymentsController.js";
import { getPendingAttCashPayments } from "../controllers/attCashPaymentsController.js";
import { updateCashPaymentIsCompleted } from "../controllers/attCashPaymentsController.js";
import { getLatestAttReceipt } from "../controllers/attCashPaymentsController.js";
    
const attCashPaymentsRoutes = express.Router();


attCashPaymentsRoutes.post("/", CreateAttCashPayments);
attCashPaymentsRoutes.get("/:attendantId", getPendingAttCashPayments);
attCashPaymentsRoutes.get("/latest/:attendantId", getLatestAttReceipt);
attCashPaymentsRoutes.put("/complete/:receiptId", updateCashPaymentIsCompleted);


export default attCashPaymentsRoutes;