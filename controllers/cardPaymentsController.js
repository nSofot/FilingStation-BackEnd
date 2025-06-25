import { isAdmin } from "./userController.js";
import CardPayments from "../models/cardPayments.js";


export async function CreateAttendantCardPayments(req, res) {
    try {
        if (!(await isAdmin(req))) {
            return res.status(403).json({ message: "You are not authorized to add card payments" });
        }

        const { attendantId, receiptDate, cardType, receiptAmount } = req.body;
        if (!attendantId || !receiptDate || !cardType || !receiptAmount) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        let receiptId = "CRD-000001";
        const lastReceipt = await CardPayments.findOne().sort({ createdAt: -1 });

        if (lastReceipt) {
            const lastId = parseInt(lastReceipt.receiptId.replace("CRD-", ""));
            receiptId = "CRD-" + String(lastId + 1).padStart(6, "0");
        }

        req.body.receiptId = receiptId;

        const receipt = new CardPayments(req.body);
        await receipt.save();

        res.status(201).json({ message: "Receipt created successfully", receipt });

    } catch (err) {
        console.error("Error creating receipt:", err);
        res.status(500).json({
            message: "Failed to create receipt",
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
