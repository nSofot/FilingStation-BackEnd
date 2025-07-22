import express from "express";
import { addSupplierTransaction } from "../controllers/supplierTransactionsController.js";

const supplierTransactionsRouter = express.Router();

// router.get("/", customerTransactionsController.getCustomerTransactions);
// router.get("/:transactionId", customerTransactionsController.getCustomerTransactionById);
supplierTransactionsRouter.post("/", addSupplierTransaction);
// router.put("/:transactionId", customerTransactionsController.updateCustomerTransaction);
// router.delete("/:transactionId", customerTransactionsController.deleteCustomerTransaction);

export default supplierTransactionsRouter;