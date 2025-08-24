import mongoose from "mongoose";

const customerTransactionsSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true,
    },  
    transactionType: {
        type: String,
        enum: ['fuel_invoice','invoice', 'receipt', 'credit_note', 'debit_note', 'payment', 'adjustment'],
        required: true
    },
    referenceNumber: {
        type: String,
        required: true,
        unique: true            
    },
    transactionDate: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: [0, 'Amount must be positive']
    },
    isCredit: {
        type: Boolean,
        required: true
    },
    relatedTransactionIds: {
        type: [String],
        default: [],
        ref: 'CustomerTransactions' // Assuming you have an Invoice model
    },
    description: {
        type: String,
        trim: true
    },
    createdBy: {
        type: String,
        default: null
    },
    dueAmount: {
        type: Number
    },
    isAttCompleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const CustomerTransactions = mongoose.model("CustomerTransactions", customerTransactionsSchema);

export default CustomerTransactions;