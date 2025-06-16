import express from "express";
import { deAllocateDispenser } from "../controllers/allocationsController.js";
import { pendingAllocations } from "../controllers/allocationsController.js";
    
const allocationRoutes = express.Router();


allocationRoutes.post("/", deAllocateDispenser);
allocationRoutes.get("/:attendantId", pendingAllocations);



export default allocationRoutes;