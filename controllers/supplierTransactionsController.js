import { isAdmin } from "./userController.js";
import SupplierTransactions from "../models/supplierTransactions.js";

export async function addSupplierTransaction(req, res) {

    try {
        if (!(await isAdmin(req))) {
            return res.status(403).json({ message: "You are not authorized to add a transaction" });
        }

        const { transactionType } = req.body;

        const prefixMap = {
            invoice: "PINV-S-",
            payment: "PAYV-S-",
            credit_note: "CRDN-S-",
            debit_note: "DBTN-S-"
        };
        const prefix = prefixMap[transactionType];
        if (!prefix) {
            return res.status(400).json({ message: "Invalid transaction type" });
        }

        let referenceNumber = prefix + "000001";
        const lastTransaction = await SupplierTransactions
            .findOne({ transactionType })
            .sort({ createdAt: -1 });

        if (lastTransaction) {
            const match = lastTransaction.referenceNumber?.match(new RegExp(`^${prefix}(\\d{6})$`));
            if (match) {
                const lastId = parseInt(match[1], 10);
                referenceNumber = prefix + String(lastId + 1).padStart(6, "0");
            }
        }

        req.body.referenceNumber = referenceNumber;

        const supplierTransaction = new SupplierTransactions(req.body);
        await supplierTransaction.save();

        res.status(201).json({
            message: "Supplier transaction created successfully",
            transaction: supplierTransaction
        });

    } catch (err) {
        console.error("Error creating supplier transaction:", err);
        res.status(500).json({
            message: "Failed to create supplier transaction",
            error: err.message
        });
    }
}


export async function getSupplierTransactionsBySupplierId(req, res){
    try {
        const supplierId = req.params.supplierId;
        const transactions = await SupplierTransactions.find({ supplierId });
        res.json(transactions);
    } catch (err) {
        console.error("Error getting supplier transactions:", err);
        res.status(500).json({
            message: "Failed to get supplier transactions",
            error: err.message
        });
    }
}

export async function getSupplierPendingTransactionsBySupplierId(req, res) {
    try {
        const { supplierId } = req.params;

        // Validate supplierId
        if (!supplierId) {
            return res.status(400).json({
                message: "Supplier ID is required."
            });
        }

        // Fetch pending transactions (credit=false, dueAmount > 0)
        const transactions = await SupplierTransactions.find({
            supplierId,
            isCredit: false,
            dueAmount: { $gt: 0 }
        }).sort({ transactionDate: -1 }); // newest first

        res.json(transactions);
    } catch (err) {
        console.error("Error fetching supplier pending transactions:", err);
        res.status(500).json({
            message: "Failed to get supplier pending transactions",
            error: err.message
        });
    }
}

export async function getLatestSupplierTransactionByType(req, res) {

    try {
        const transactionType = req.params.type;
        const transactions = await SupplierTransactions.findOne({ transactionType }).sort({ createdAt: -1 });
        res.json(transactions);
    } catch (err) {
        console.error("Error getting latest supplier transaction:", err);
        res.status(500).json({
            message: "Failed to get latest supplier transaction",
            error: err.message
        });
    }
}


export async function updateOverdueTransactions(req, res) {
    const referenceNumber = req.params.referenceNumber;
    const paidAmount = parseFloat(req.body.paidAmount);

    if (isNaN(paidAmount) || paidAmount <= 0) {
        return res.status(400).json({ message: "Invalid paid amount." });
    }

    try {
        const invoice = await SupplierTransactions.findOne({ referenceNumber });

        if (!invoice) {
            return res.status(404).json({ message: "Credit transction not found." });
        }

        const newDueAmount = parseFloat(invoice.dueAmount) - paidAmount;

        invoice.dueAmount = newDueAmount >= 0 ? newDueAmount : 0;
        await invoice.save();

        return res.status(200).json({
            message: "Due amount updated successfully.",
            updatedDueAmount: invoice.dueAmount
        });
    } catch (err) {
        console.error("Error updating credit invoice due amount:", err);
        return res.status(500).json({
            message: "Internal server error while updating due amount."
        });
    }
}

