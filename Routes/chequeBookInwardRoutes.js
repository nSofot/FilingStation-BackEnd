import express from "express";
import {
    addInwardCheque,
    getAllInwardCheques,
    getInwardChequeByChequeNo,
    getChequesByStatus,
    updateInwardChequeStatus
} from "../controllers/chequeBookInwardController.js";

const router = express.Router();

router.post("/", addInwardCheque);
router.get("/", getAllInwardCheques);
router.get("/:chequeNumber", getInwardChequeByChequeNo);
router.get("/status/:status", getChequesByStatus);
router.put("/status/:chequeNumber", updateInwardChequeStatus);

export default router;
