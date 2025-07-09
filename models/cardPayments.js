import mongoose from "mongoose";

const cardPaymentsSchema = new mongoose.Schema({
    referenceId: {
        type: String,
        required: true,
        unique: true
    },
    receiptId: {
        type: String,
        required: true,
        unique: true
    },
    attendantId: {
        type: String,
    },
    receiptDate: {
        type: Date,
        required: true
    },
    cardType: {
        type: String,
        required: true
    },
    referenceNumber: {
        type: String,
    },
    receiptAmount: {
        type: Number,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    isSettled: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const CardPayments = mongoose.model("CardPayments", cardPaymentsSchema);

export default CardPayments;