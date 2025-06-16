import mongoose from "mongoose";

const dispenserSchema = new mongoose.Schema({
    dispenserId: {
        type: String,
        required: true,
        unique: true
    },
    fuelType: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    meterReading: {
        type: Number,
    },
    meterDate: {
        type: Date,
    },
    attendantId: {
        type: String,
    },
    allocatedAt: {
        type: Date, 
    },
    openingMeter: {
        type: Number,
    },
    isAllocated: {
        type: Boolean,
        default: false
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

const Dispenser = mongoose.model("Dispenser", dispenserSchema);

export default Dispenser;