import express from "express";
import { getAccountTransactions } from "../controllers/accountTransactionsController.js";
import { createAccountTransaction } from "../controllers/accountTransactionsController.js";
import { updateAccountTransaction } from "../controllers/accountTransactionsController.js";
import { deleteAccountTransaction } from "../controllers/accountTransactionsController.js";
import { getAccountTransactionById } from "../controllers/accountTransactionsController.js";


const accountTransactionsRoutes = express.Router();


accountTransactionsRoutes.get("/", getAccountTransactions);
accountTransactionsRoutes.get("/:accountId", getAccountTransactionById);
accountTransactionsRoutes.post("/", createAccountTransaction);
accountTransactionsRoutes.put("/:transactionId", updateAccountTransaction);
accountTransactionsRoutes.delete("/:transactionId", deleteAccountTransaction);



export default accountTransactionsRoutes;
