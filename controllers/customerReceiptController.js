import { isAdmin } from "./userController.js";
import CustomerPaymentReceipt from "../models/customerReceipt.js";

// ✅ CREATE CASH PAYMENT
export async function addCustomerPaymentReceipt(req, res) {
    try {
        // Ensure user is an admin
        if (!(await isAdmin(req))) {
            return res.status(403).json({ message: "You are not authorized to add cash payment" });
        }

        // Generate next receipt ID
        let receiptId = "RCPT-C-000001";
        const lastReceipt = await CustomerPaymentReceipt.findOne().sort({ createdAt: -1 });

        if (lastReceipt) {
            const match = lastReceipt.receiptId?.match(/^RCPT-C-(\d{6})$/);
            if (match) {
                const lastId = parseInt(match[1], 10);
                receiptId = "RCPT-C-" + String(lastId + 1).padStart(6, "0");
            }
        }

        req.body.receiptId = receiptId;
        const receipt = new CustomerPaymentReceipt(req.body);
        await receipt.save();

        res.status(201).json({ message: "Customer payment created successfully", receipt });
    } catch (err) {
        console.error("Error creating customer payment:", err);
        res.status(500).json({
            message: "Failed to create customer payment",
            error: err.message
        });
    }
}


// ✅ GET ALL RECEIPTS
export async function getAllCustomerReceipts(req, res) {
    try {
        const receipts = await CustomerPaymentReceipt.find().lean();
        res.json(receipts);
    } catch (err) {
        console.error("Error fetching receipts:", err);
        res.status(500).json({ message: "Server error while fetching receipts" });
    }
}

// ✅ GET ONE RECEIPT BY ID
export async function getCustomerReceiptById(req, res) {
    const { receiptId } = req.params;

    try {
        const receipt = await CustomerPaymentReceipt.findOne({ receiptId }).lean();
        if (!receipt) {
            return res.status(404).json({ message: "Receipt not found" });
        }
        res.json(receipt);
    } catch (err) {
        console.error("Error fetching receipt:", err);
        res.status(500).json({ message: "Server error while fetching receipt" });
    }
}

// ✅ GET LATEST RECEIPT FOR CUSTOMER
export async function getLatestCustomerReceipt(req, res) {
    const { customerId } = req.params;
    
    if (!customerId || customerId.trim() === "") {
        return res.status(400).json({ message: "Customer ID is required" });
    }

    try {
        const latest = await CustomerPaymentReceipt.findOne({ customerId })
            .sort({ createdAt: -1 })
            .lean();

        if (!latest) {
            return res.status(404).json({ message: "No receipts for this customer" });
        }

        res.json(latest);
    } catch (err) {
        console.error("Error fetching latest receipt:", err);
        res.status(500).json({ message: "Server error while fetching receipt" });
    }
}


export async function getReceiptsByCustomerId(req, res) {
    const customerId = req.params.customerId;
    try {
        // ✅ Basic query: find all pending invoices for given attendant
        const receipts = await CustomerPaymentReceipt.find({
            customerId
        });
        // ✅ Return empty array instead of 404
        return res.json(receipts); // if no data, invoices = []
    } catch (err) {
        res.status(500).json({
            message: "Error getting pending receipts",
            error: err.message || err
        });
    }
}