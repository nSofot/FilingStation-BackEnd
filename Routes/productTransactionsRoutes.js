import express from "express";
import {    addProductTransaction,
            getProductTransactionsByitemId,
            getProductTransactionsByReferenceId
        } from "../controllers/productTransactionsController.js";

const productTransactionsRouter = express.Router();

productTransactionsRouter.get("/productId/:productId", getProductTransactionsByitemId);
productTransactionsRouter.get("/referenceId/:referenceId", getProductTransactionsByReferenceId);
productTransactionsRouter.post("/", addProductTransaction);
// router.put("/:transactionId", customerTransactionsController.updateCustomerTransaction);
// router.delete("/:transactionId", customerTransactionsController.deleteCustomerTransaction);

export default productTransactionsRouter;