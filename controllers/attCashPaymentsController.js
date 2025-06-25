import { isAdmin } from "./userController.js";
import AttCashPayments from "../models/attCashPayments.js";

// ✅ CREATE CASH PAYMENT
export async function CreateAttCashPayments(req, res) {
    try {
        // Ensure user is an admin
        if (!(await isAdmin(req))) {
            return res.status(403).json({ message: "You are not authorized to add cash payment" });
        }

        // Generate next receipt ID
        let receiptId = "REC-A-000001";
        const lastReceipt = await AttCashPayments.findOne().sort({ createdAt: -1 });

        if (lastReceipt) {
            const lastId = parseInt(lastReceipt.receiptId.replace("REC-A-", ""));
            receiptId = "REC-A-" + String(lastId + 1).padStart(6, "0");
        }

        req.body.receiptId = receiptId;
        const receipt = new AttCashPayments(req.body);
        await receipt.save();

        res.status(201).json({ message: "Cash payment created successfully", receipt });
    } catch (err) {
        console.error("Error creating cash payment:", err);
        res.status(500).json({
            message: "Failed to create cash payment",
            error: err.message
        });
    }
}

// ✅ GET PENDING CASH PAYMENTS
export async function getPendingAttCashPayments(req, res) {
    const attendantId = req.params.attendantId;

    try {
        const receipts = await AttCashPayments.find({ attendantId, isCompleted: false });
        return res.json(receipts); // returns empty array if none found
    } catch (err) {
        res.status(500).json({
            message: "Error getting pending cash payments",
            error: err.message
        });
    }
}


export async function updateCashPaymentIsCompleted(req, res) {
    if (!(await isAdmin(req))) {
        return res.status(403).json({
            message: "You are not authorized to update cash payments"
        });
    }

    const receiptId = req.params.receiptId;

    try {
        const result = await AttCashPayments.updateOne(
            { receiptId },
            { $set: { isCompleted: true } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "Cash payment not found"
            });
        }

        res.json({ message: "Cash payment updated successfully" });
    } catch (err) {
        res.status(500).json({
            message: "Failed to update cash payment",
            error: err.message || err
        });
    }
}
