import mongoose from "mongoose";

const allocationsSchema = new mongoose.Schema({
    attendantId: {
        type: String,
        required: true,
    },
    deAllocatedAt: {
        type: Date
    },
    dispensers: [
        {
            dispenserId: {
                type: String,
            },
            allocatedAt: {
                type: Date,
            },
            productId: {
                type: String
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