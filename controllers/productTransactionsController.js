import { isAdmin } from "./userController.js";
import ProductTransactions from "../models/productTransactions.js";

export async function addProductTransaction(req, res) {
    try {
        // Ensure user is an admin
        if (!(await isAdmin(req))) {
            return res.status(403).json({ message: "You are not authorized to add a transaction" });
        }

        const productTransaction = new ProductTransactions(req.body);
        await productTransaction.save();

        res.status(201).json({
            message: "Product transaction created successfully",
            transaction: productTransaction, // ✅ fixed this line
        });
    } catch (err) {
        console.error("Error creating product transaction:", err);
        res.status(500).json({
            message: "Failed to create product transaction",
            error: err.message
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





