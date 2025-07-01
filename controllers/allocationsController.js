import Allocations from "../models/allocations.js";
import { isAdmin } from "./userController.js";



export async function addAllocation(req, res) {

    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "You are not authorized to add brand",
        });
    }

    // Generate next receipt ID
    let allocationId = "ALC-000001";
    const lastAllocation = await Allocations.findOne().sort({ createdAt: -1 });

    if (lastAllocation) {
        const lastId = parseInt(lastAllocation.allocationId.replace("ALC-", ""));
        allocationId = "ALC-" + String(lastId + 1).padStart(6, "0");
    }

    req.body.allocationId = allocationId;
    const allocationData = new Allocations(req.body);

    try {
        await allocationData.save();
        res.json({ message: "Deallocation record added" });
    } catch (error) {
        console.error("Error saving deallocation record:", error);
        res.status(500).json({
            message: "Deallocation record not added",
            error: error.message,
        });
    }
};


export async function deAllocation(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "You are not authorized to deallocate dispensers",
        });
    }

    const allocationId = req.params.allocationId;
    const updatedClosingMeters = req.body.closingMeters;

    if (!updatedClosingMeters || typeof updatedClosingMeters !== "object") {
        return res.status(400).json({ message: "Invalid or missing closingMeters data" });
    }

    try {
        const allocation = await Allocations.findOne({ allocationId });

        if (!allocation) {
            return res.status(404).json({ message: "Allocation not found for attendant" });
        }

        allocation.dispensers = allocation.dispensers.map(dispenser => {
            const newMeter = updatedClosingMeters[dispenser.dispenserId];
            return {
                ...dispenser.toObject(),
                closingMeter: newMeter !== undefined ? newMeter : dispenser.closingMeter
            };
        });

        allocation.deAllocatedAt = new Date();
        allocation.isCompleted = false;
        allocation.isDeallocated = true;

        await allocation.save();

        return res.json({ message: "Allocation updated successfully" });

    } catch (err) {
        console.error("Failed to update allocation:", err);
        return res.status(500).json({
            message: "Server error while updating allocation",
            error: err.message || err
        });
    }
}



export async function getPendingAllocation(req, res) {

    const attendantId = req.params.attendantId;

    try{
        const allocate = await Allocations.find({attendantId : attendantId, isCompleted : false})
        if (allocate == null) {
            res.status(404).json({
                message : "Pending Allocation not found"
            })
            return
        }

        if(allocate.isCompleted == false){
            res.json(allocate)
        }
        else{
            if(!isAdmin(req)){
                res.status(404).json({
                message : "Pending Allocation not found"
            })
            return
            }
            else{
                res.json(allocate)
            }                
        }
    }

    catch(err){
        res.status(500).json({
            message : "Error getting pending allocations",
            error: err
        })
    }
    
}


export async function getAllPendingAllocations(req, res) {

    try{
        const allocate = await Allocations.find( {isCompleted : false, isDeallocated : true} )
        if (allocate == null) {
            res.status(404).json({
                message : "Pending Allocation not found"
            })
            return
        }

        if(allocate.isCompleted == false){
            res.json(allocate)
        }
        else{
            if(!isAdmin(req)){
                res.status(404).json({
                message : "Pending Allocation not found"
            })
            return
            }
            else{
                res.json(allocate)
            }                
        }
    }

    catch(err){
        res.status(500).json({
            message : "Error getting pending allocations",
            error: err
        })
    }
    
}

export async function updateCompletedAllocation(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "You are not authorized to update allocations"
        });
        return;
    }

    const allocationId = req.params.allocationId;

    try {
        const result = await Allocations.updateOne(
            { allocationId: allocationId },
            { 
                $set: { 
                    isCompleted: true,
                } 
            }
        );

        if (result.matchedCount === 0) {
            // No customer found with that ID
            res.status(404).json({
                message: "Allocation not found"
            });
            return;
        }
        

        res.json({
            message: "Allocation updated successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to update allocation",
            error: err.message || err
        });
    }
}

export async function getSoldProducts(req, res) {
    const productId = req.query?.productId?.trim();

    try {
        let query = { isDeallocated: true };

        if (productId) {
            query.dispensers = { $elemMatch: { productId } };
        }

        const allocated = await Allocations.find(query);

        res.json(allocated);
    } catch (err) {
        res.status(500).json({
            message: "Error getting Allocations",
            error: err.message || err
        });
    }
}
