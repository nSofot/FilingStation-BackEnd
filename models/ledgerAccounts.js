import mongoose from "mongoose";

const ledgerAccountSchema = new mongoose.Schema(
    {
        /* e.g. "100-001" */
        accountId: { 
            type: String, 
            required: true, 
            unique: true 
        },

        /* Header accounts / Child accounts / Child ledgers */
        accountType: {
            type: String,
            required: true,
            enum: ["Header accounts", "Child accounts", "Child ledgers"],
        },

        /* Asset / Liability / Equity / Income / Expense */
        accountCategory: {
            type: String,
            required: true,
            enum: ["Asset", "Liability", "Equity", "Income", "Expense"],
        },

        /* Current Assets | Non-Current Assets | Current Liabilities | Long-Term Liabilities | 
        Equity / Capital | Income / Revenue | Cost of Sales | Operating Expenses | Financial Expenses | Depreciation */
        accountSubCategory: {
            type: String,
            default: ""
        },

        headerAccount: { 
            type: String, 
            default: ""
        },

        accountName: { 
            type: String, 
            default: ""
        },

        accountBalance: {
            type: Number,
            default: 0,
        },

        updatedAt: {
            type: Date,
            default: Date.now
        },

        createdAt: {
            type: Date,
            default: Date.now
        },

        isDeleted: {
            type: Boolean,
            default: false
        }
    }
);

const LedgerAccount = mongoose.model("LedgerAccount", ledgerAccountSchema);
export default LedgerAccount;
