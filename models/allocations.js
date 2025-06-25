import mongoose from "mongoose";

const allocationsSchema = new mongoose.Schema({
    allocationId: {
        type: String,
        required: true,
        unique: true
    },
    attendantId: {
        type: String,
        required: true,
    },
    allocatedAt: {
        type: Date,
        required: true
    },
    deAllocatedAt: {
        type: Date
    },
    dispensers: [
        {
            dispenserId: {
                type: String,
            },
            fuelType: {
                type: String,
            },
            productId: {
                type: String,
            },
            price: {
                type: Number,
            },
            openingMeter: {
                type: Number,
            },
            closingMeter: {
                type: Number,
            }
        }
    ],
    isDeallocated: {
        type: Boolean,
        default: false
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

const Allocations = mongoose.model("Allocations", allocationsSchema);

export default Allocations;