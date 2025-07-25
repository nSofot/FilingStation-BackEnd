import { isAdmin } from "./userController.js";
import ChequeBookInward from "../models/chequeBookInward.js";

export async function addInwardCheque(req, res) {
    if (!isAdmin(req)) return res.status(403).json({ message: "Unauthorized access" });

    try {
        const newCheque = new ChequeBookInward(req.body);
        await newCheque.save();
        res.status(201).json({ message: "New cheque added successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to add new cheque", error: err.message });
    }
}

export async function getAllInwardCheques(req, res) {
    if (!isAdmin(req)) return res.status(403).json({ message: "Unauthorized access" });

    try {
        const cheques = await ChequeBookInward.find();
        res.json(cheques);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch cheques", error: err.message });
    }
}

export async function getInwardChequeByChequeNo(req, res) {
    if (!isAdmin(req)) return res.status(403).json({ message: "Unauthorized access" });

    try {
        const { chequeNumber } = req.params;
        const cheque = await ChequeBookInward.findOne({ chequeNumber });
        if (!cheque) {
            return res.status(404).json({ message: "Cheque not found" });
        }
        res.json(cheque);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch cheque", error: err.message });
    }
}


export async function getChequesByStatus(req, res) {
    // Optional: Add admin access control
    // if (!isAdmin(req)) return res.status(403).json({ message: "Unauthorized access" });
    try {
        const { status } = req.params;

        if (!status) {
            return res.status(400).json({ message: "Cheque status is required" });
        }

        const cheques = await ChequeBookInward.find({ chequeStatus: status.trim() });

        res.status(200).json(cheques);
    } catch (err) {
        console.error("Error fetching cheques by status:", err);
        res.status(500).json({ message: "Failed to fetch cheques", error: err.message });
    }
}


export async function updateInwardChequeStatus(req, res) {
    if (!isAdmin(req)) return res.status(403).json({ message: "Unauthorized access" });

    try {
        const { chequeNumber } = req.params;
        const updated = await ChequeBookInward.findOneAndUpdate(
            { chequeNumber },
            req.body,
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ message: "Cheque not found" });
        }
        res.json({ message: "Cheque status updated successfully", updated });
    } catch (err) {
        res.status(500).json({ message: "Failed to update cheque status", error: err.message });
    }
}
