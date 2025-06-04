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
    attendantId: {
        type: String,
    },
    meterReading: {
        type: Number,
    },
    meterDate: {
        type: Date,
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