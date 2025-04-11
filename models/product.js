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
        required: true
    },
    UoM : {
        type: String,
        required: true
    },
    reOrderLevel: {
        type: Number,
    },
    isAvailable: {
        type: Boolean,
        required: true    
    }   
});

const Product = mongoose.model("Product", productSchema);

export default Product;