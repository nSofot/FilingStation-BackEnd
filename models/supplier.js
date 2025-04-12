import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
    supplierId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String
    },
    Balance: {
        type: Number,
        default: 0
    },    
    status: {
        type: String,
        required: true,
        default: "Active"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;