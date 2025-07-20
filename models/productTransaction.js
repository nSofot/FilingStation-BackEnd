import mongoose from "mongoose";

const productTransactionSchema = new mongoose.Schema({
    invoiceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Invoice' // Assuming you have an Invoice model
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product' // Assuming you have a Product model
    },
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    uom: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    brand: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ProductTransaction = mongoose.model("ProductTransaction", productTransactionSchema);

export default ProductTransaction;
