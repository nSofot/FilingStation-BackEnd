import express from "express";
import {
  addCustomerPaymentReceipt,
  getAllCustomerReceipts,
  getCustomerReceiptById,
  getLatestCustomerReceipt,
  getReceiptsByCustomerId

} from "../controllers/customerReceiptController.js";

const customerReceiptRoutes = express.Router();

customerReceiptRoutes.post("/", addCustomerPaymentReceipt);
customerReceiptRoutes.get("/", getAllCustomerReceipts);
customerReceiptRoutes.get("/latest/:customerId", getLatestCustomerReceipt);
customerReceiptRoutes.get("/customer/:customerId", getReceiptsByCustomerId);
customerReceiptRoutes.get("/:receiptId", getCustomerReceiptById);

export default customerReceiptRoutes;