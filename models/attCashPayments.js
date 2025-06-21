import mongoose from "mongoose";

const attCashPaymentsSchema = new mongoose.Schema({
    receiptId: {
        type: String,
        required: true,
        unique: true
    },
    attendantId: {
        type: String,
        required: true
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
    isCompleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const AttCashPayments = mongoose.model("AttCashPayments", attCashPaymentsSchema);

export default AttCashPayments;
