import express from "express";
import { saveCustomer } from "../controllers/customerController.js";
import { getCustomer } from "../controllers/customerController.js";
import { deleteCustomer } from "../controllers/customerController.js";

const customerRouter = express.Router();


customerRouter.post("/", saveCustomer);
customerRouter.get("/", getCustomer);
customerRouter.delete("/:customerId", deleteCustomer);


export default customerRouter;