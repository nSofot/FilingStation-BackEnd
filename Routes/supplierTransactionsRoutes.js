import express from "express";
import {    addSupplierTransaction,
            getSupplierTransactionsBySupplierId,
            getSupplierPendingTransactionsBySupplierId,
            getLatestSupplierTransactionByType,
            updateOverdueTransactions
        } from "../controllers/supplierTransactionsController.js";

const supplierTransactionsRouter = express.Router();

supplierTransactionsRouter.post("/", addSupplierTransaction);
supplierTransactionsRouter.get("/supplier/:supplierId", getSupplierTransactionsBySupplierId);
supplierTransactionsRouter.get("/supplier/pending/:supplierId", getSupplierPendingTransactionsBySupplierId);
supplierTransactionsRouter.get("/latest/:type", getLatestSupplierTransactionByType);
supplierTransactionsRouter.put("/overdue/:referenceNumber/pay", updateOverdueTransactions);

export default supplierTransactionsRouter;