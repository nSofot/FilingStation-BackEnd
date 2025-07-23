import { isAdmin } from "./userController.js";
import CustomerTransactions from "../models/customerTransactions.js";

export async function addCustomerTransaction(req, res) {
    try {
        if (!(await isAdmin(req))) {
            return res.status(403).json({ message: "You are not authorized to add a transaction" });
        }

        const { transactionType } = req.body;

        const prefixMap = {
            invoice: "INVC-C-",
            receipt: "RCPT-C-",
            credit_note: "CRDN-C-",
            debit_note: "DBTN-C-"
        };

        const prefix = prefixMap[transactionType];
        if (!prefix) {
            return res.status(400).json({ message: "Invalid transaction type" });
        }

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

        const customerTransaction = new CustomerTransactions(req.body);
        await customerTransaction.save();

        res.status(201).json({
            message: "Customer transaction created successfully",
            transaction: customerTransaction // ✅ Corrected
        });
    } catch (err) {
        console.error("❌ Error creating customer transaction:", err);
        res.status(500).json({
            message: "Failed to create customer transaction",
            error: err.message
        });
    }
}



export async function getLatestCustomerTransaction(req, res) {
    // Ensure user is an admin
    if (!(await isAdmin(req))) {
        return res.status(403).json({ message: "You are not authorized to add a transaction" });
    }

    const { transactionType } = req.params; // ✅ FIXED

    try {
        const latest = await CustomerTransactions.findOne({ transactionType })
            .sort({ createdAt: -1 })
            .lean();

        if (!latest) {
            return res.status(404).json({ message: "No transactions for this type" });
        }

        res.json(latest);
    } catch (err) {
        console.error("Error fetching latest transaction:", err);
        res.status(500).json({ message: "Server error while fetching transaction" });
    }
}


export async function getCustomerTransactionByCustomerId(req, res) {
    const { customerId } = req.params;

    try {
        const transactions = await CustomerTransactions.find({ customerId });

        if (transactions.length === 0) {
            return res.status(404).json({ message: "No transactions found for this customer" });
        }

        res.json(transactions);
    } catch (err) {
        console.error("Error fetching transactions:", err);
        res.status(500).json({ message: "Server error while fetching transactions" });
    }
}

export async function getCustomerPendingTransactionByCustomerId(req, res) {
    const { customerId } = req.params;

    try {
        const transactions = await CustomerTransactions.find({
            customerId,
            isCredit: false,
            dueAmount: { $gt: 0 }
        });

        if (transactions.length === 0) {
            return res.status(404).json({ message: "No pending transactions found for this customer" });
        }

        res.json(transactions);
    } catch (err) {
        console.error("Error fetching pending transactions:", err);
        res.status(500).json({ message: "Server error while fetching pending transactions" });
    }
}