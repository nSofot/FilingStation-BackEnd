import { isAdmin } from "./userController.js";
import CardPayments from "../models/cardPayments.js";


export async function CreateAttendantCardPayments(req, res) {
    try {
        // Admin check
        if (!(await isAdmin(req))) {
            return res.status(403).json({ message: "You are not authorized to add card payments" });
        }

        // Validate required fields
        const { attendantId, receiptDate, cardType, receiptAmount, receiptId } = req.body;
        if (!attendantId || !receiptDate || !cardType || receiptAmount == null || !receiptId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Generate next reference ID
        let referenceId = "CARD-0000001";
        const lastReceipt = await CardPayments.findOne().sort({ createdAt: -1 });

        if (lastReceipt?.referenceId?.startsWith("CARD-")) {
            const lastId = parseInt(lastReceipt.referenceId.replace("CARD-", ""), 10); // ✅ fixed
            if (!isNaN(lastId)) {
                referenceId = "CARD-" + String(lastId + 1).padStart(7, "0");
            }
        }

        req.body.referenceId = referenceId;

        // Save card payment
        let receipt;
        try {
            receipt = new CardPayments(req.body);
            await receipt.save();
        } catch (saveError) {
            console.error("🛑 Mongoose Save Error:", saveError.message, saveError.errors);
            return res.status(500).json({
                message: "Database save failed",
                error: saveError.message
            });
        }

        res.status(201).json({ message: "Receipt created successfully", receipt });

    } catch (err) {
        console.error("Error creating card payment receipt:", err);
        res.status(500).json({
            message: "Failed to create card payment receipt",
            error: err.message
        });
    }
}





export async function getPendingAttendentCardPayments(req, res) {
    const attendantId = req.params.attendantId;

    try {
        const receipts = await CardPayments.find({ attendantId, isCompleted: false });

        // Just return empty array if no receipts
        return res.json(receipts);
    } catch (err) {
        res.status(500).json({
            message: "Error getting pending card payments",
            error: err.message
        });
    }
}



export async function updateCardPaymentIsCompleted(req, res) {
    try {
        if (!(await isAdmin(req))) {
            return res.status(403).json({
                message: "You are not authorized to update card payments"
            });
        }

        const receiptId = req.params.receiptId;

        const result = await CardPayments.updateOne(
            { receiptId },
            { $set: { isCompleted: true } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "Receipt not found"
            });
        }

        res.json({ message: "Card payment updated successfully" });
    } catch (err) {
        console.error("Error in updateCardPaymentIsCompleted:", err);
        res.status(500).json({
            message: "Failed to update card payment",
            error: err.message || err
        });
    }
}


export async function getAllCardPaymentVouchers(req, res) {
    try{
        const cardVouchers = await CardPayments.find()
        res.json(cardVouchers)

    }
    catch(err){
        res.status(500).json({
            message : "Error getting card payment vouchers",
            error: err
        })
    }
}