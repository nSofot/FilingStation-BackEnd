import express from "express";
import {    addProductTransaction,
            getProductTransactionsByitemId
        } from "../controllers/productTransactionsController.js";

const productTransactionsRouter = express.Router();

// router.get("/", customerTransactionsController.getCustomerTransactions);
// router.get("/:transactionId", customerTransactionsController.getCustomerTransactionById);
productTransactionsRouter.get("/productId/:productId", getProductTransactionsByitemId);
productTransactionsRouter.post("/", addProductTransaction);
// router.put("/:transactionId", customerTransactionsController.updateCustomerTransaction);
// router.delete("/:transactionId", customerTransactionsController.deleteCustomerTransaction);

export default productTransactionsRouter;