import { isAdmin } from "./userController.js";
import AccountTransactions from "../models/accountTransactions.js";


export async function getAccountTransactions(req, res) {
    // if (!isAdmin(req)) return res.status(403).json({ message: "Unauthorized access" });

    try {
        const accountTransactions = await AccountTransactions.find();
        res.json(accountTransactions);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch account transactions", error: err.message });
    }
}


export async function getAccountTransactionById(req, res) {
    // if (!isAdmin(req)) return res.status(403).json({ message: "Unauthorized access" });

    try {
        const { accountId } = req.params;
        const accountTransaction = await AccountTransactions.find({ accountId });
        if (!accountTransaction) {
            return res.status(404).json({ message: "Account transaction not found" });
        }
        res.json(accountTransaction);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch account transaction", error: err.message });
    }
}


export async function createAccountTransaction(req, res) {
    try {
        // Check if user is admin
        const admin = await isAdmin(req);
        if (!admin) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        // Save transaction
        const accountTransaction = new AccountTransactions(req.body);
        await accountTransaction.save();

        // Respond with success and created transaction
        res.status(201).json({ 
            message: "Account transaction created", 
            transaction: accountTransaction 
        });
    } catch (err) {
        console.error("Error creating account transaction:", err);
        res.status(500).json({ 
            message: "Failed to create account transaction", 
            error: err.message 
        });
    }
}   

export async function updateAccountTransaction(req, res) {
    if (!isAdmin(req)) return res.status(403).json({ message: "Unauthorized access" });

    try {
        const { transactionId } = req.params;
        const result = await AccountTransactions.updateOne({ transactionId }, req.body);

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Account transaction not found" });
        }

        res.json({ message: "Account transaction updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to update account transaction", error: err.message });
    }
}

export async function deleteAccountTransaction(req, res) {
    if (!isAdmin(req)) return res.status(403).json({ message: "Unauthorized access" });

    try {
        const { transactionId } = req.params;
        const result = await AccountTransactions.deleteOne({ transactionId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Account transaction not found" });
        }

        res.json({ message: "Account transaction deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete account transaction", error: err.message });
    }
}