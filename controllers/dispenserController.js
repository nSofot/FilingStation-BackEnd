import Dispenser from "../models/dispenser.js";
import { isAdmin } from "./userController.js";


export async function CreateDispenser(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "You are not authorized to create dispenser",
        });
    }

    let dispenserId = "DIS-01";

    try {
        const lastDispenser = await Dispenser.find().sort({ createdAt: -1 }).limit(1);
        if (lastDispenser.length > 0) {
            const lastId = parseInt(lastDispenser[0].dispenserId.replace("DIS-", ""));
            dispenserId = "DIS-" + String(lastId + 1).padStart(2, "0");
        }
    } catch (err) {
        return res.status(500).json({ message: "Failed to fetch last dispenser", error: err.message });
    }

    req.body.dispenserId = dispenserId;
    req.body.createdAt = new Date(); 

    const dispenser = new Dispenser(req.body);

    try {
        await dispenser.save();
        res.json({ message: "Dispenser added" });
    } catch (error) {
        console.error("Error saving dispenser:", error);
        res.status(500).json({
            message: "Dispenser not added",
            error: error.message,
        });
    }
}


export async function getDispenser(req,res) {

    try{
        const dispenser = await Dispenser.find()
        res.json(dispenser)

    }
    catch(err){
        res.status(500).json({
            message : "Error getting dispenser",
            error: err
        })
    }
}


export async function getDispenserById(req, res) {
    const dispenserId = req.params.dispenserId

    try{
        const dispenser = await Dispenser.findOne({dispenserId : dispenserId})
        if (dispenser == null) {
            res.status(404).json({
                message : "Dispenser not found"
            })
            return
        }

        res.json(customer)

    }

    catch(err){
        res.status(500).json({
            message : "Error getting dispenser",
            error: err
        })
    }
}



export async function deleteDispenser(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "You are not authorized to delete dispenser"
        });
        return;
    }

    try {
        const result = await Dispenser.deleteOne({ dispenserId: req.params.dispenserId });

        if (result.deletedCount === 0) {
            res.status(404).json({
                message: "Dispenser not found"
            });
            return;
        }

        res.json({
            message: "Dispenser deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to delete dispenser",
            error: err.message || err
        });
    }
}



export async function updateDispenser(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "You are not authorized to update dispenser"
        });
        return;
    }

    const dispenserId = req.params.dispenserId;
    const updatingData = req.body;

    try {
        const result = await Dispenser.updateOne({ dispenserId: dispenserId }, updatingData);

        if (result.matchedCount === 0) {
            res.status(404).json({
                message: "Dispenser not found"
            });
            return;
        }

        res.json({
            message: "Dispenser updated successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to update dispenser",
            error: err.message || err
        });
    }
}
