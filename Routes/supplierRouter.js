import express from "express";
import { CreateSupplier} from "../controllers/supplierController.js";
import { getSupplier } from "../controllers/supplierController.js";
import { getSupplierById } from "../controllers/supplierController.js";
import { deleteSupplier } from "../controllers/supplierController.js";
import { updateSupplier } from "../controllers/supplierController.js";
import { searchSuppliers } from "../controllers/supplierController.js";
import { addSupplierBalance } from "../controllers/supplierController.js";
import { subtractSupplierBalance } from "../controllers/supplierController.js";

const supplierRouter = express.Router();


supplierRouter.post("/", CreateSupplier);
supplierRouter.get("/search", searchSuppliers);
supplierRouter.get("/", getSupplier);
supplierRouter.get("/:supplierId", getSupplierById);
supplierRouter.delete("/:supplierId", deleteSupplier);
supplierRouter.put("/:supplierId", updateSupplier);
supplierRouter.put("/balance/add", addSupplierBalance);
supplierRouter.put("/balance/subtract", subtractSupplierBalance);


export default supplierRouter;