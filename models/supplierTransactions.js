import mongoose from "mongoose";

const supplierTransactionsSchema = new mongoose.Schema({
    supplierId: {
        type: String,
        required: true,
        ref: 'Supplier' // Assuming you have a Supplier model
    },  
    transactionType: {
        type: String,
        enum: ['invoice', 'payment', 'credit_note', 'debit_note'],
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
    dueAmount: {
        type: Number,
        min: [0, 'Amount must be positive']
    },
    isCredit: {
        type: Boolean,
        required: true
    },
    relatedInvoiceId: {
        type: [String],
        default: []
    },
    description: {
        type: String,
        trim: true
    },
    createdBy: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const SupplierTransactions = mongoose.model("SupplierTransactions", supplierTransactionsSchema);

export default SupplierTransactions;