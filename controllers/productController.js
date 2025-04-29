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
        const products = await Product.findOne({productId : productId})
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



export function saveProduct(req, res) {

    if(!isAdmin(req))
    {
        res.status(403).json({
            message : "You are not authorized to add products"
        })
        return
    } 

    const product = new Product(req.body
    );

    product
        .save()
        .then(() => {
            res.json({
                message: "Product added"
            });
        })
        .catch(() => {
            res.json({
                message: "Product not added"  
            });
    })
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