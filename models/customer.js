import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
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
        required: true
    },
    phone: {
        type: String,
    },
    email: {
        type: String
    },
    creditLimit: {
        type: Number,
        default: 0
    },
    creditPeriod: {
        type: Number,
        default: 0
    },
    Balance: {
        type: Number,
        default: 0
    },    
    isActive: {
        type: String,
        required: true,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;