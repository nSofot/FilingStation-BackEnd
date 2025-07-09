import mongoose from "mongoose";

const accountTransactionsSchema = new mongoose.Schema({
    trxId: {
        type: String,
        required: true,
        unique: false
    },
    trxDate: {
        type: Date,
        required: true
    },
    accountId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    trxType: {
        type: String,
        enum: ["Debit", "Credit"],  // optional: restrict transaction types
        required: true
    },
    trxAmount: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: String
    }
}, { timestamps: true });  // adds createdAt and updatedAt automatically

const AccountTransactions = mongoose.model("AccountTransactions", accountTransactionsSchema);

export default AccountTransactions;
