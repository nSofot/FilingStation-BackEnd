import express from "express";
import { deleteProduct, getProducts, saveProduct } from "../controllers/productController.js";
import { getProductById } from "../controllers/productController.js";
import { getProductsByCategory } from "../controllers/productController.js";    
import { updateProduct } from "../controllers/productController.js";
import { subtractStockMultipleProducts} from "../controllers/productController.js";


const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/:productId", getProductById);
productRouter.get("/categeryId/:categoryId", getProductsByCategory);
productRouter.post("/", saveProduct);
productRouter.delete("/:productId", deleteProduct);
productRouter.put("/subtract", subtractStockMultipleProducts);
productRouter.put("/:productId", updateProduct);



export default productRouter;