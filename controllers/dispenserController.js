import Dispenser from "../models/dispenser.js";
import User from "../models/user.js";
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

        if(dispenser.isActive == true){
            res.json(dispenser)
        }
        else{
            if(!isAdmin(req)){
                res.status(404).json({
                message : "Dispenser not found"
            })
            return
            }
            else{
                res.json(dispenser)
            }                
        }
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
            // No dispenser found with that ID
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
            // No dispenser found with that ID
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


// Allocate dispenser to an attendant
export async function allocateDispenser(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Not authorized" });
    }

    const { dispenserId, attendantId } = req.body;

    if (!dispenserId || !attendantId) {
        return res.status(400).json({ message: "dispenserId and attendantId are required" });
    }

    try {
        const dispenser = await Dispenser.findOne({ dispenserId });
        if (!dispenser) return res.status(404).json({ message: "Dispenser not found" });

        const attendant = await User.findOne({ userId: attendantId });
        if (!attendant || attendant.role !== "Pumpman") {
            return res.status(400).json({ message: "Invalid attendantId" });
        }

        dispenser.attendantId = attendantId;
        dispenser.updatedAt = new Date();
        await dispenser.save();

        res.json({ message: `Dispenser ${dispenserId} allocated to ${attendant.firstname} ${attendant.lastname}` });
    } catch (err) {
        res.status(500).json({ message: "Failed to allocate dispenser", error: err.message });
    }
}


export async function getDispensersByAttendant(req, res) {
    const { attendantId } = req.params;
    try {
        const dispensers = await Dispenser.find({ attendantId: attendantId });
        res.json(dispensers);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch dispensers" });
    }
};


// Allocate multiple dispensers to one attendant
export async function allocateMultipleDispensers(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Not authorized" });
    }

    const { dispenserIds, attendantId, allocatedAt } = req.body;

    if (!dispenserIds || !Array.isArray(dispenserIds) || !attendantId) {
        return res.status(400).json({ message: "dispenserIds (array) and attendantId are required" });
    }

    try {
        const updates = dispenserIds.map(async (dispenserId) => {
            const dispenser = await Dispenser.findOne({ dispenserId });

            if (!dispenser) return null;

            await Dispenser.updateOne(
                { dispenserId },
                {
                    attendantId,
                    allocatedAt: allocatedAt || new Date(),
                    openingMeter: dispenser.meterReading ?? 0,
                    isAllocated: true,
                    updatedAt: new Date()
                }
            );
        });

        await Promise.all(updates);

        res.json({ message: "Dispensers allocated successfully" });
    } catch (err) {
        console.error("Bulk allocation failed:", err);
        res.status(500).json({
            message: "Failed to allocate dispensers",
            error: err.message || err
        });
    }
}



export async function deAllocateMultipleDispensers(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Not authorized" });
    }

    const { updates } = req.body;

    if (!updates || !Array.isArray(updates)) {
        return res.status(400).json({ message: "updates array is required" });
    }

    try {
        const updatePromises = updates.map(({ dispenserId, updateData }) => {
        return Dispenser.updateOne({ dispenserId }, updateData);
        });

        await Promise.all(updatePromises);

        res.json({ message: "Dispensers deallocated successfully" });
    } catch (err) {
        console.error("Bulk deallocation failed:", err);
        res.status(500).json({
        message: "Failed to deallocate dispensers",
        error: err.message || err,
        });
    }
}
