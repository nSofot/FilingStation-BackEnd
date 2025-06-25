import { isAdmin } from "./userController.js";
import AttCreditInvoice from "../models/attCreditInvoice.js";

export async function CreateInvoice(req, res) {
    try {
        // Ensure user is an admin
        if (!(await isAdmin(req))) {
            return res.status(403).json({ message: "You are not authorized to add invoice" });
        }

        // Generate next invoice ID
        let invoiceId = "INV-A-000001";
        const lastInvoice = await AttCreditInvoice.findOne().sort({ createdAt: -1 });

        if (lastInvoice) {
            const lastId = parseInt(lastInvoice.invoiceId.replace("INV-A-", ""));
            invoiceId = "INV-A-" + String(lastId + 1).padStart(6, "0");
        }

        // Create and save new invoice
        req.body.invoiceId = invoiceId;
        const invoice = new AttCreditInvoice(req.body);
        await invoice.save();

        res.status(201).json({ message: "Invoice created successfully", invoice });

    } catch (err) {
        console.error("Error creating invoice:", err);
        res.status(500).json({
            message: "Failed to create invoice",
            error: err.message
        });
    }
}


export async function getPendingInvoices(req, res) {
    const attendantId = req.params.attendantId;

    try {
        // ✅ Basic query: find all pending invoices for given attendant
        const invoices = await AttCreditInvoice.find({
            attendantId,
            isCompleted: false
        });

        // ✅ Return empty array instead of 404
        return res.json(invoices); // if no data, invoices = []


    } catch (err) {
        res.status(500).json({
            message: "Error getting pending invoices",
            error: err.message || err
        });
    }
}



export async function updateCreditPaymentIsCompleted(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "You are not authorized to update credit invoices"
        });
        return;
    }

    const invoiceId = req.params.invoiceId;

    try {
        const result = await AttCreditInvoice.updateOne(
            { invoiceId: invoiceId },
            { $set: { isCompleted: true } }
            );


        if (result.matchedCount === 0) {
            // No customer found with that ID
            res.status(404).json({
                message: "Credit invoice not found"
            });
            return;
        }

        res.json({
            message: "Credit invoice updated successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to update credit invoice",
            error: err.message || err
        });
    }
}