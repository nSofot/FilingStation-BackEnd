import express from "express";
import { addAllocation} from "../controllers/allocationsController.js";
import { deAllocation } from "../controllers/allocationsController.js";
import { getPendingAllocation } from "../controllers/allocationsController.js";
import { getAllPendingAllocations } from "../controllers/allocationsController.js";
import { updateCompletedAllocation } from "../controllers/allocationsController.js";

    
const allocationRoutes = express.Router();


allocationRoutes.post("/", addAllocation);
allocationRoutes.put("/:allocationId", deAllocation);
allocationRoutes.get("/", getAllPendingAllocations);
allocationRoutes.get("/:attendantId", getPendingAllocation);
allocationRoutes.put("/complete/:allocationId", updateCompletedAllocation);


export default allocationRoutes;