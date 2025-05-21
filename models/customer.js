import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true,
        unique: true
    },
    customerType: {
        type: String,
        required: true
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
    balance: {
        type: Number,
        default: 0
    },
    creditLimit: {
        type: Number,
        default: 0
    },
    creditPeriod: {
        type: String,
        default: 0
    },
    birthDate: {
        type: Date,
    },
    taxNumber: {
        type: String,
    },
    contactPerson: {
        type: String,
    },
    notes: {
        type: String
    },
    isActive: {
        type: String,
        required: true,
        default: true
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;