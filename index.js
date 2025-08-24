import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";

// Route Imports
import userRouter from "./Routes/userRouter.js";
import productRouter from "./Routes/productRouter.js";
import categoryRouter from "./Routes/categoryRouter.js";
import brandRouter from "./Routes/brandRouter.js";
import uomRouter from "./Routes/uomRouter.js";
import customerRouter from "./Routes/customerRouter.js";
import supplierRouter from "./Routes/supplierRouter.js";
import dispenserRouter from "./Routes/dispenserRouter.js";
import grnRoutes from "./Routes/grnRoutes.js";
import allocationRoutes from "./Routes/allocationRoutes.js";
import attCreditInvoiceRoutes from "./Routes/attCreditInvoiceRoutes.js";
import cardPaymentsRoutes from "./Routes/cardPaymentsRoutes.js";
import attCashPaymentsRoutes from "./Routes/attCashPaymentsRoutes.js";
import ledgerAccountRouter from "./Routes/ledgerAccountRoutes.js";
import customerTransactionsRouter from "./Routes/customerTransactionsRoutes.js";
import supplierTransactionsRouter from "./Routes/supplierTransactionsRoutes.js";
import productTransactionsRouter from "./Routes/productTransactionsRoutes.js";
import accountTransactionsRouter from "./Routes/accountTransactionsRoutes.js";
import chequeBookInwardRoutes from "./Routes/chequeBookInwardRoutes.js";
import chequeBookOutwardRouter from "./Routes/chequeBookOutwardRoutes.js";


dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Auth middleware
app.use((req, res, next) => {
    const tokenString = req.header("Authorization");
    if (tokenString) {
        const token = tokenString.replace("Bearer ", "");
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (decoded) {
                req.user = decoded;
                next();
            } else {
                res.status(403).json({ message: "Invalid token" });
            }
        });
    } else {
        next();
    }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to database"))
    .catch(() => console.log("Connection failed"));

// Routes
app.use("/api/user", userRouter);
app.use("/api/customer", customerRouter);
app.use("/api/supplier", supplierRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/uom", uomRouter);
app.use("/api/dispenser", dispenserRouter);
app.use("/api/allocation", allocationRoutes);
app.use("/api/grn", grnRoutes);
app.use("/api/attCreditInvoice", attCreditInvoiceRoutes);
app.use("/api/cardPayment", cardPaymentsRoutes);
app.use("/api/attCashPayment", attCashPaymentsRoutes);
app.use("/api/accounts", ledgerAccountRouter);
app.use("/api/customerTransactions", customerTransactionsRouter);
app.use("/api/supplierTransactions", supplierTransactionsRouter);
app.use("/api/productTransactions", productTransactionsRouter);
app.use("/api/accountTransactions", accountTransactionsRouter);
// app.use("/api/customerReceipt", customerReceiptRoutes);
app.use("/api/chequeBookInward", chequeBookInwardRoutes);
app.use("/api/chequeBookOutward", chequeBookOutwardRouter);


// Default 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Endpoint not found" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

