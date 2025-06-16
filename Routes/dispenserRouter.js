import express from "express";
import { CreateDispenser } from "../controllers/dispenserController.js";
import { getDispenser } from "../controllers/dispenserController.js";
import { getDispenserById } from "../controllers/dispenserController.js";
import { deleteDispenser } from "../controllers/dispenserController.js";
import { updateDispenser } from "../controllers/dispenserController.js";
import { allocateDispenser } from "../controllers/dispenserController.js";
import { getDispensersByAttendant } from "../controllers/dispenserController.js";
import { allocateMultipleDispensers } from "../controllers/dispenserController.js";
import { deAllocateMultipleDispensers } from "../controllers/dispenserController.js";

const dispenserRouter = express.Router();


dispenserRouter.post("/", CreateDispenser);
dispenserRouter.get("/", getDispenser);
dispenserRouter.get("/:dispenserId", getDispenserById);
dispenserRouter.delete("/:dispenserId", deleteDispenser);
dispenserRouter.get("/attendant/:attendantId", getDispensersByAttendant);

dispenserRouter.put("/allocate-multiple", allocateMultipleDispensers);
dispenserRouter.put("/allocate", allocateDispenser);
dispenserRouter.put("/deallocate-multiple", deAllocateMultipleDispensers);  // Move this BEFORE

dispenserRouter.put("/:dispenserId", updateDispenser);  // Put param route last


export default dispenserRouter;