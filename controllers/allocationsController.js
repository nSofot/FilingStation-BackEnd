import Allocations from "../models/allocations.js";
import { isAdmin } from "./userController.js";



export async function deAllocateDispenser(req, res) {

    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "You are not authorized to add brand",
        });
    }

    const deAllocationData = new Allocations(req.body);

    try {
        await deAllocationData.save();
        res.json({ message: "Deallocation record added" });
    } catch (error) {
        console.error("Error saving deallocation record:", error);
        res.status(500).json({
            message: "Deallocation record not added",
            error: error.message,
        });
    }
};


// export async function getAllocations(req,res) {

//     try{
//         const allocate = await Allocations.find()
//         res.json(allocate)

//     }
//     catch(err){
//         res.status(500).json({
//             message : "Error getting allocations",
//             error: err
//         })
//     }
// }


export async function pendingAllocations(req, res) {

    const attendantId = req.params.attendantId;

    try{
        const allocate = await Allocations.find({attendantId : attendantId})
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