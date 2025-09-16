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
    balance: {
        type: Number,
        default: 0,
        required: true,   // ✅ ensures it won’t be null
        set: v => v == null ? 0 : v // ✅ converts null → 0
    },
    contactPerson: {
        type: String
    },
    taxNumber: {
        type: String
    },
    notes: {
        type: String
    },
    isActive: {
        type: Boolean,
        required: true,        
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;