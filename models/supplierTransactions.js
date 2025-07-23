import mongoose from "mongoose";

const supplierTransactionsSchema = new mongoose.Schema({
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Supplier' // Assuming you have a Supplier model
    },  
    transactionType: {
        type: String,
        enum: ['invoice', 'receipt', 'credit_note', 'debit_note'],
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
    relatedInvoiceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SupplierTransactions' // Assuming you have an Invoice model
    },
    description: {
        type: String,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true
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

const SupplierTransactions = mongoose.model("SupplierTransactions", supplierTransactionsSchema);

export default SupplierTransactions;