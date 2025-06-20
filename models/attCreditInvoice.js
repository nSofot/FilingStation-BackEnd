import mongoose from "mongoose";

const attCreditInvoiceSchema = new mongoose.Schema({
    invoiceId: {
        type: String,
        required: true,
        unique: true
    },
    attendantId: {
        type: String,
        required: true,
    },
    invoiceDate: {
        type: Date
    },
    orderNumber: {
        type: String,
    },
    customerId: {
        type: String,
        required: true
    },
    products: [
        {
            productId: {
                type: String,
            },
            productName: {
                type: String,
            },
            brandName: {
                type: String
            },
            uomName: {
                type: String,
            },
            price: {
                type: Number,
            },
            quantity: {
                type: Number,
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
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

const AttCreditInvoice = mongoose.model("AttCreditInvoice", attCreditInvoiceSchema);

export default AttCreditInvoice;