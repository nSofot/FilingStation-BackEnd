import express from "express";
import { AddCategory } from "../controllers/categoryController.js";
import { getCategory } from "../controllers/categoryController.js";
import { getCategoryById } from "../controllers/categoryController.js";
import { deleteCategory } from "../controllers/categoryController.js";
import { updateCategory } from "../controllers/categoryController.js";

    
const categoryRouter = express.Router();


categoryRouter.post("/", AddCategory);
categoryRouter.get("/", getCategory);
categoryRouter.get("/:categoryId", getCategoryById);
categoryRouter.delete("/:categoryId", deleteCategory);
categoryRouter.put("/:categoryId", updateCategory);


export default categoryRouter;