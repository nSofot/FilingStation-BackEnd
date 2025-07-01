import express from "express";
import { CreateInvoice } from "../controllers/attCreditInvoiceContrloler.js";
import { getPendingInvoices } from "../controllers/attCreditInvoiceContrloler.js";
import { updateCreditPaymentIsCompleted } from "../controllers/attCreditInvoiceContrloler.js";
import { getCustomerInvoices } from "../controllers/attCreditInvoiceContrloler.js";
import { getCustomerPendingInvoices } from "../controllers/attCreditInvoiceContrloler.js";

    
const attCreditInvoiceRoutes = express.Router();


attCreditInvoiceRoutes.post("/", CreateInvoice)
attCreditInvoiceRoutes.get("/attenant-pending/:attendantId", getPendingInvoices);
attCreditInvoiceRoutes.get("/customer-invoices/:customerId", getCustomerInvoices);
attCreditInvoiceRoutes.get("/customer-pending-invoices/:customerId", getCustomerPendingInvoices);
attCreditInvoiceRoutes.put("/complete/:invoiceId", updateCreditPaymentIsCompleted);


export default attCreditInvoiceRoutes;