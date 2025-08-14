import express from "express";
import { addGrn,
        getGrn,
        getGrnProducts,
        deleteGrn, 
        getLatestGRN,
        updateCompletedGRN,
        getPendingGRNs
 } from "../controllers/grnController.js";

const grnRoutes = express.Router();


grnRoutes.post("/", addGrn);
grnRoutes.get("/products/", getGrnProducts);
grnRoutes.get("/latest", getLatestGRN);
grnRoutes.get("/", getGrn);
grnRoutes.get("/pending", getPendingGRNs);
grnRoutes.delete("/:transactionId", deleteGrn);
grnRoutes.put("/complete/:trxId", updateCompletedGRN);


export default grnRoutes;