import mongoose from "mongoose";

const chequeBookInwardSchema = new mongoose.Schema({
    receiptId: {
        type: String,
        required: true,
        unique: true
    },
    customerId: {
        type: String,
        required: true
    },
    receiptDate: {
        type: Date,
        required: true
    },
    chequeNumber: {
        type: String,
        required: false,
    },
    chequeDate: {
        type: Date,
        required: false,
    },
    chequeAmount: {
        type: Number,
        required: true
    },
    chequeStatus: {
        type: String,
        enum: ["Pending", "Deposited", "Cleared", "Bounced"],
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ChequeBookInward = mongoose.model("ChequeBookInward", chequeBookInwardSchema);

export default ChequeBookInward;