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
        default: ""
    },
    mobile: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    balance: {
        type: Number,
        default: 0
    },
    chequeBalance: {
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
    vehicleNumbers: {
        type: [String],
        default: []
    },
    notes: {
        type: String
    },
    isActive: {
        type: Boolean,
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