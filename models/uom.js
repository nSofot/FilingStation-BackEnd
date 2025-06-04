import mongoose from "mongoose";

const uomSchema = new mongoose.Schema({
    uomId: {
        type: String,
        required: true,
        unique: true
    },
    uomName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Uom = mongoose.model("Uom", uomSchema);

export default Uom;