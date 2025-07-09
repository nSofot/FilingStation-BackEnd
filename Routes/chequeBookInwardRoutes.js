import express from "express";
import {
    addInwardCheque,
    getAllInwardCheques,
    getInwardChequeByChequeNo,
    updateInwardChequeStatus
} from "../controllers/chequeBookInwardController.js";

const router = express.Router();

router.post("/", addInwardCheque);
router.get("/", getAllInwardCheques);
router.get("/:chequeNumber", getInwardChequeByChequeNo);
router.put("/:chequeNumber", updateInwardChequeStatus);

export default router;
