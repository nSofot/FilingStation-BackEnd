import express from "express";
import { saveTransaction } from "../controllers/transactionController.js";
import { getTransaction } from "../controllers/transactionController.js";
import { deleteTransaction } from "../controllers/transactionController.js";

const transactionRouter = express.Router();


transactionRouter.post("/", saveTransaction);
transactionRouter.get("/", getTransaction);
transactionRouter.delete("/:transactionId", deleteTransaction);


export default transactionRouter;