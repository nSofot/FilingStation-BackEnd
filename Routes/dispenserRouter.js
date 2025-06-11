import express from "express";
import { CreateDispenser } from "../controllers/dispenserController.js";
import { getDispenser } from "../controllers/dispenserController.js";
import { getDispenserById } from "../controllers/dispenserController.js";
import { deleteDispenser } from "../controllers/dispenserController.js";
import { updateDispenser } from "../controllers/dispenserController.js";
import { allocateDispenser } from "../controllers/dispenserController.js";
import { getDispensersByAttendant } from "../controllers/dispenserController.js";
import { allocateDispenserMultiple } from "../controllers/dispenserController.js";

const dispenserRouter = express.Router();


dispenserRouter.post("/", CreateDispenser);
dispenserRouter.get("/", getDispenser);
dispenserRouter.get("/:dispenserId", getDispenserById);
dispenserRouter.delete("/:dispenserId", deleteDispenser);
dispenserRouter.get("/attendant/:attendantId", getDispensersByAttendant);
dispenserRouter.put("/allocate-multiple", allocateDispenserMultiple);
dispenserRouter.put("/allocate", allocateDispenser);
dispenserRouter.put("/:dispenserId", updateDispenser);

export default dispenserRouter;