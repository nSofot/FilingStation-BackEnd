import express from "express";
import { AddBrand } from "../controllers/brandController.js";
import { getBrand } from "../controllers/brandController.js";
import { getBrandById } from "../controllers/brandController.js";
import { deleteBrand } from "../controllers/brandController.js";
import { updateBrand } from "../controllers/brandController.js";

    
const brandRouter = express.Router();


brandRouter.post("/", AddBrand);
brandRouter.get("/", getBrand);
brandRouter.get("/:brandId", getBrandById);
brandRouter.delete("/:brandId", deleteBrand);
brandRouter.put("/:brandId", updateBrand);


export default brandRouter;