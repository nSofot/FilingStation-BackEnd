import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryId: {
        type: String,
        required: true,
        unique: true
    },
    categoryName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Category = mongoose.model("Category", categorySchema);

export default Category;