import { isAdmin } from "./userController.js";
import SupplierTransactions from "../models/supplierTransactions.js";

export async function addSupplierTransaction(req, res) {
    try {
        // Ensure user is an admin
        if (!(await isAdmin(req))) {
            return res.status(403).json({ message: "You are not authorized to add a transaction" });
        }

        const { transactionType } = req.body;

        // Determine prefix based on transaction type
        let prefixMap = {
            invoice: "INVC-S-",
            receipt: "RCPT-S-",
            credit_note: "CRDN-S-",
            debit_note: "DBTN-S-"
        };

        const prefix = prefixMap[transactionType];
        if (!prefix) {
            return res.status(400).json({ message: "Invalid transaction type" });
        }

        // Generate next reference number
        let referenceNumber = prefix + "000001";
        const lastTransaction = await CustomerTransactions
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

        res.status(201).json({ message: "Supplier transaction created successfully", transaction });
    } catch (err) {
        console.error("Error creating supplier transaction:", err);
        res.status(500).json({
            message: "Failed to create supplier transaction",
            error: err.message
        });
    }
}
