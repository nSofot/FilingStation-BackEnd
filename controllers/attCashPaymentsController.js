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

        if (receipts.length === 0) {
            // Optional: if admin, return all receipts
            if (await isAdmin(req)) {
                const allReceipts = await AttCashPayments.find({ attendantId });
                return res.json(allReceipts);
            }

            return res.status(404).json({ message: "No pending cash payments found" });
        }

        res.json(receipts);
    } catch (err) {
        res.status(500).json({
            message: "Error getting pending cash payments",
            error: err.message
        });
    }
}
