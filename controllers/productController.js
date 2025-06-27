import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function getProducts(req,res) {
    try{
        if(isAdmin(req)){
            const products = await Product.find()
            res.json(products)
        }
        else{
            const products = await Product.find({isAvailable : true})
            res.json(products)
        }
    }
    catch(err){
        res.status(500).json({
            message : "Error getting products",
            error: err
        })
    }
}


export async function getProductById(req, res) {
    const productId = req.params.productId

    try{
        const products = await Product.find({productId : productId})
        if (products == null) {
            res.status(404).json({
                message : "Product not found"
            })
            return
        }

        if(products.isAvailable){
            res.json(products)
        }
        else{
            if(!isAdmin(req)){
                res.status(404).json({
                message : "Product not found"
            })
            return
            }
            else{
                res.json(products)
            }                
        }
    }

    catch(err){
        res.status(500).json({
            message : "Error getting product",
            error: err
        })
    }
}

export async function getProductsByCategory(req, res) {
    const categoryId = req.params.categoryId;

    try {
        const products = await Product.find({ categoryId: categoryId });

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found in this category" });
        }

        // Filter based on availability for non-admin users
        const filteredProducts = isAdmin(req)
            ? products
            : products.filter(p => p.isAvailable);

        res.json(filteredProducts);
    } catch (err) {
        res.status(500).json({
            message: "Error getting products",
            error: err.message,
        });
    }
}


export async function saveProduct(req, res) {

    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "You are not authorized to add product",
        });
    }

    let productId = "ITM-00001";

    try {
        const lastProduct = await Product.find().sort({ createdAt: -1 }).limit(1);
        if (lastProduct.length > 0) {
            const lastId = parseInt(lastProduct[0].productId.replace("ITM-", ""));
            productId = "ITM-" + String(lastId + 1).padStart(5, "0");
        }
    } catch (err) {
        return res.status(500).json({ message: "Failed to fetch last product", error: err.message });
    }

    req.body.productId = productId;
    req.body.createdAt = new Date(); 

    const product = new Product(req.body);

    try {
        await product.save();
        res.json({ message: "Product added" });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({
            message: "Product not added",
            error: error.message,
        });
    }
}   

export async function deleteProduct(req, res) {
    if(!isAdmin(req))
    {
        res.status(403).json({
            message : "You are not authorized to delete products"
        })
        return
    } 

    try{
        const result = await Product.deleteOne({ productId: req.params.productId });

        if (result.deletedCount === 0) {
            // No customer found with that ID
            res.status(404).json({
                message: "Customer not found"
            });
            return;
        }

        res.json({
            message : "Product deleted successfully"
        })
    }
    catch(err){
        res.status(500).json({
            message : "Failed to delete product",
            error: err
        })
    }
}

export async function updateProduct(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "You are not authorized to update products"
        });
        return;
    }

    const productId = req.params.productId;
    const updatingData = req.body;

    try {
        const result = await Product.updateOne({ productId: productId }, updatingData);

        if (result.matchedCount === 0) {
            // No product found with that ID
            res.status(404).json({
                message: "Product not found"
            });
            return;
        }

        res.json({
            message: "Product updated successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to update product",
            error: err
        });
    }
}


export async function subtractStockMultipleProducts(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Not authorized" });
    }

    const { updates } = req.body;

    if (!updates || !Array.isArray(updates)) {
        return res.status(400).json({ message: "updates array is required" });
    }

    try {
        const updatePromises = updates.map(({ productId, quantity }) => {
            if (typeof quantity !== 'number') {
                throw new Error(`Invalid quantity for productId ${productId}`);
            }
            return Product.updateOne(
                { productId },
                { $inc: { stock: -Math.abs(quantity) }, $set: { updatedAt: new Date() } }
            );
        });

        await Promise.all(updatePromises);

        res.json({ message: "Products stock deducted successfully" });
    } catch (err) {
        console.error("Bulk deduction failed:", err);
        res.status(500).json({
            message: "Failed to deduct product stock",
            error: err.message || err,
        });
    }
}
