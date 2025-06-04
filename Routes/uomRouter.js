import express from "express";
import { AddUom } from "../controllers/uomController.js";
import { getUom } from "../controllers/uomController.js";
import { getUomById } from "../controllers/uomController.js";
import { deleteUom } from "../controllers/uomController.js";
import { updateUom } from "../controllers/uomController.js";

    
const uomRouter = express.Router();


uomRouter.post("/", AddUom);
uomRouter.get("/", getUom);
uomRouter.get("/:uomId", getUomById);
uomRouter.delete("/:uomId", deleteUom);
uomRouter.put("/:uomId", updateUom);


export default uomRouter;