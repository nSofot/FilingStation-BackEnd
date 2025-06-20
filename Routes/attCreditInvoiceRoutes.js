import express from "express";
import { CreateInvoice } from "../controllers/attCreditInvoiceContrloler.js";
import { getPendingInvoices } from "../controllers/attCreditInvoiceContrloler.js";

    
const attCreditInvoiceRoutes = express.Router();


attCreditInvoiceRoutes.post("/", CreateInvoice)
attCreditInvoiceRoutes.get("/:attendantId", getPendingInvoices);


export default attCreditInvoiceRoutes;