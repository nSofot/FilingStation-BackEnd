import mongoose from "mongoose";

const grnSchema = new mongoose.Schema({
    trxId: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true        
    },
    invoiceNumber: {
        type: String
    },      
    supplierId: {
        type: String,
        required: true
    },     
    totalAmount: {
        type: Number
    },
    itemDetails: [
        {
            productId: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    isCompleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Grn = mongoose.model("Grn", grnSchema);

export default Grn