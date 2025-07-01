import express from "express";
import { addGrn } from "../controllers/grnController.js";
import { getGrn } from "../controllers/grnController.js";
import { getGrnProducts } from "../controllers/grnController.js";
import { deleteGrn } from "../controllers/grnController.js";

const grnRoutes = express.Router();


grnRoutes.post("/", addGrn);
grnRoutes.get("/products/", getGrnProducts);
grnRoutes.get("/", getGrn);
grnRoutes.delete("/:transactionId", deleteGrn);


export default grnRoutes;