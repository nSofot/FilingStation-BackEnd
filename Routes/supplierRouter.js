import express from "express";
import { saveSupplier } from "../controllers/supplierController.js";
import { getSupplier } from "../controllers/supplierController.js";
import { deleteSupplier } from "../controllers/supplierController.js";

const supplierRouter = express.Router();


supplierRouter.post("/", saveSupplier);
supplierRouter.get("/", getSupplier);
supplierRouter.delete("/:supplierId", deleteSupplier);


export default supplierRouter;