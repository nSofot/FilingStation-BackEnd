import express from "express";
import { addGrn,
        getGrn,
        getGrnProducts,
        deleteGrn, 
        getLatestGRN
 } from "../controllers/grnController.js";

const grnRoutes = express.Router();


grnRoutes.post("/", addGrn);
grnRoutes.get("/products/", getGrnProducts);
grnRoutes.get("/latest", getLatestGRN);
grnRoutes.get("/", getGrn);
grnRoutes.delete("/:transactionId", deleteGrn);


export default grnRoutes;