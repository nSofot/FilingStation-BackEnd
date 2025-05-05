import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    trxId: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    }, 
    date: {
        type: Date,
        required: true        
    },
    description: {
        type: String
    },   
    customerId: {
        type: String,
        required: true
    },    
    supplierId: {
        type: String,
        required: true
    },     
    total: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction