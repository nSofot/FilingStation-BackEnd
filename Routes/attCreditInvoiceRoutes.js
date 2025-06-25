import express from "express";
import { CreateInvoice } from "../controllers/attCreditInvoiceContrloler.js";
import { getPendingInvoices } from "../controllers/attCreditInvoiceContrloler.js";
import { updateCreditPaymentIsCompleted } from "../controllers/attCreditInvoiceContrloler.js";

    
const attCreditInvoiceRoutes = express.Router();


attCreditInvoiceRoutes.post("/", CreateInvoice)
attCreditInvoiceRoutes.get("/:attendantId", getPendingInvoices);
attCreditInvoiceRoutes.put("/complete/:invoiceId", updateCreditPaymentIsCompleted);


export default attCreditInvoiceRoutes;