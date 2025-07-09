import mongoose from "mongoose";

const customerPaymentReceiptSchema = new mongoose.Schema({
    receiptId: {
        type: String,
        required: true,
        unique: true
    },
    customerId: {
        type: String, // Consider using ObjectId if referencing customers
        required: true
    },
    cashAmount: {
        type: Number,
    },
    cardAmount: {
        type: Number,
    },
    chequeAmount: {
        type: Number,
    },
    bankAmount: {
        type: Number,
    },
    receiptDate: {
        type: Date,
        required: true
    },
    receiptAmount: {
        type: Number,
        required: true,
        min: [0, 'Receipt amount must be positive']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const CustomerPaymentReceipt = mongoose.model("CustomerPaymentReceipt", customerPaymentReceiptSchema);

export default CustomerPaymentReceipt;