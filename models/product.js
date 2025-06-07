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
    categoryId: {
        type: String,
        required: true
    },
    brandId: {
        type: String,
    },
    description: {
        type: String,
    },
    image: [
        {type: String},
    ],
    avarageCost: {
        type: Number,
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
    },
    uomId : {
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