import mongoose from "mongoose";

const chequeBookOutwardSchema = new mongoose.Schema({
    paymentId: {
        type: String,
        required: true,
        unique: true
    },
    supplierId: {
        type: String,
        required: true
    },
    paymentDate: {
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
        enum: ["Issued", "Cleared", "Bounced"],
        default: "Issued"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ChequeBookOutward = mongoose.model("ChequeBookOutward", chequeBookOutwardSchema);

export default ChequeBookOutward;