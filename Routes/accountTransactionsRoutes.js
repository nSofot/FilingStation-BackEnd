import express from "express";
import { getAccountTransactions } from "../controllers/accountTransactionsController.js";
import { createAccountTransaction } from "../controllers/accountTransactionsController.js";
import { updateAccountTransaction } from "../controllers/accountTransactionsController.js";
import { deleteAccountTransaction } from "../controllers/accountTransactionsController.js";
import { getAccountTransactionById } from "../controllers/accountTransactionsController.js";


const accountTransactionsRouter = express.Router();


accountTransactionsRouter.get("/", getAccountTransactions);
accountTransactionsRouter.get("/:accountId", getAccountTransactionById);
accountTransactionsRouter.post("/", createAccountTransaction);
accountTransactionsRouter.put("/:transactionId", updateAccountTransaction);
accountTransactionsRouter.delete("/:transactionId", deleteAccountTransaction);



export default accountTransactionsRouter;
