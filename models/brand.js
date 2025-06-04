import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    brandId: {
        type: String,
        required: true,
        unique: true
    },
    brandName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;