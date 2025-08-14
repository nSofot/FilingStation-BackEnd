import { isAdmin } from "./userController.js";
import ProductTransactions from "../models/productTransactions.js";

export async function addProductTransaction(req, res) {
    try {
        if (!(await isAdmin(req))) {
        return res.status(403).json({ message: "You are not authorized to add a transaction" });
        }

        if (req.body.transactionType === "adjustment") {
            let referenceId = "AJST-A-000001"; // default for adjustments

            const lastTransaction = await ProductTransactions.findOne({ transactionType: req.body.transactionType }).sort({ createdAt: -1 });

            if (lastTransaction && lastTransaction.referenceId) {
                const match = lastTransaction.referenceId.match(/^AJST-[AS]-(\d{6})$/);
                if (match) {
                    const lastId = parseInt(match[1], 10);
                    const prefix = req.body.transactionType === "adjustment" ? "A" : "S";
                    referenceId = `AJST-${prefix}-` + String(lastId + 1).padStart(6, "0");
                }
            }

            req.body.referenceId = referenceId;
        }

    const productTransaction = new ProductTransactions(req.body);
        await productTransaction.save();

        res.status(201).json({
        message: "Product transaction created successfully",
        transaction: productTransaction,
        });

    } catch (err) {
        console.error("Error saving product transaction:", err); // 👈 See exact validation error
        res.status(500).json({
        message: "Failed to create product transaction",
        error: err.message,
        });
    }
}


export async function getProductTransactionsByitemId(req, res) {
    try {
        const { productId } = req.params;

        // Query transactions where any product in 'products' array has matching productId
        const transactions = await ProductTransactions.find({
            "products.productId": productId
        });

        // Return empty array if no transactions found (good REST practice)
        if (transactions.length === 0) {
            return res.status(200).json([]);
        }

        // Return found transactions
        res.status(200).json(transactions);
    } catch (err) {
        console.error("Error fetching product transactions:", err);
        res.status(500).json({
            message: "Failed to fetch product transactions",
            error: err.message
        });
    }
}

export async function getProductTransactionsByReferenceId(req, res) {
    try {
        const { referenceId } = req.params;

        const transactions = await ProductTransactions.findOne({
            referenceId: referenceId
        });

        if (transactions.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(transactions);
    } catch (err) {
        console.error("Error fetching product transactions:", err);
        res.status(500).json({
            message: "Failed to fetch product transactions",
            error: err.message
        });
    }
}

// export const getProductTransactionsByReferenceId = async (req, res) => {
//   try {
//     const trx = await ProductTransactions.findOne({ referenceId: req.params.id });
//     if (!trx) {
//       return res.status(404).json({ message: "Transaction not found" });
//     }
//     res.json({
//       products: trx.products, // ✅ send products directly
//       transaction: trx
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching transaction", error: err.message });
//   }
// };

