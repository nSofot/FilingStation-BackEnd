import express from "express";
import { 
        addCustomerTransaction,
        getLatestCustomerTransaction,
        getCustomerTransactionByCustomerId,
        getCustomerPendingTransactionByCustomerId
    } from "../controllers/customerTransactionsController.js";

const customerTransactionsRouter = express.Router();

// router.get("/", customerTransactionsController.getCustomerTransactions);
customerTransactionsRouter.get("/pending/:customerId", getCustomerPendingTransactionByCustomerId);
customerTransactionsRouter.get("/customer/:customerId", getCustomerTransactionByCustomerId);
customerTransactionsRouter.get("/latest/:transactionType", getLatestCustomerTransaction);
customerTransactionsRouter.post("/", addCustomerTransaction);
// router.put("/:transactionId", customerTransactionsController.updateCustomerTransaction);
// router.delete("/:transactionId", customerTransactionsController.deleteCustomerTransaction);

export default customerTransactionsRouter;