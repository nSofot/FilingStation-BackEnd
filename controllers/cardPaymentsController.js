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
        const receipts = await CardPayments.find({ attendantId });

        if (receipts.length === 0) {
            // Optional: if admin, return all receipts
            if (await isAdmin(req)) {
                const allReceipts = await CardPayments.find({ attendantId });
                return res.json(allReceipts);
            }

            return res.status(404).json({ message: "No pending card payments found" });
        }

        res.json(receipts);
    } catch (err) {
        res.status(500).json({
            message: "Error getting pending card payments",
            error: err.message
        });
    }
}
