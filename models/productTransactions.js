import mongoose from "mongoose";

const productTransactionsSchema = new mongoose.Schema({
    referenceId: {
        type: String,
        required: true
    },
    transactionType: {
        type: String,
        required: true,
        enum: ['invoice', 'grn', 'adjustment'],
    },
    transactionDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    isAdded: {
        type: Boolean,
        required: true
    },
    products: [
        {
            productId: {
                type: String,
                required: true,
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
            category: {
                type: String,
                required: true
            },
            brand: {
                type: String
            },
        }      
    ], 
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ProductTransactions = mongoose.model("ProductTransactions", productTransactionsSchema);

export default ProductTransactions;
