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
        default: 0
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
        type: String,
        required: true,
        default: false
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