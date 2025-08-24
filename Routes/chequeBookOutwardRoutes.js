import express from "express";
import {
    addOutwardCheque,
    getAllOutwardCheques,
    getOutwardChequeByChequeNo,
    getOutwardChequesByStatus,
    updateOutwardChequeStatus
} from "../controllers/chequeBookOutwardController.js";

const chequeBookOutwardRouter = express.Router();

chequeBookOutwardRouter.post("/", addOutwardCheque);
chequeBookOutwardRouter.get("/", getAllOutwardCheques);
chequeBookOutwardRouter.get("/:chequeNumber", getOutwardChequeByChequeNo);
chequeBookOutwardRouter.get("/status/:status", getOutwardChequesByStatus);
chequeBookOutwardRouter.put("/status/:chequeNumber", updateOutwardChequeStatus);

export default chequeBookOutwardRouter;

