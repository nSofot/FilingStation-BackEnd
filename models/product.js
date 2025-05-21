import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
    },
    description: {
        type: String,
    },
    image: [
        {type: String},
    ],
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
    },
    uom : {
        type: String,
    },
    reOrderLevel: {
        type: Number,
    },
    maxStockLevel: {
        type: Number
    },
    isAvailable: {
        type: Boolean,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    } 
});

const Product = mongoose.model("Product", productSchema);

export default Product;