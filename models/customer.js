import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    customerId: {
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
    status: {
        type: String,
        required: true,
        default: "Active"
    }
    
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;