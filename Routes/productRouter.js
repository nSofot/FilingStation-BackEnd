import express from "express";
import { deleteProduct, getProducts, saveProduct } from "../controllers/productController.js";
import { getProductById } from "../controllers/productController.js";
import { updateProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/:productId", getProductById);
productRouter.post("/", saveProduct);
productRouter.delete("/:productId", deleteProduct);
productRouter.put("/:productId", updateProduct);

export default productRouter;