import Uom from "../models/uom.js";
import { isAdmin } from "./userController.js";


export async function AddUom(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "You are not authorized to add UoM",
        });
    }

    let uomId = "UOM-001";

    try {
        const lastUom = await Uom.find().sort({ createdAt: -1 }).limit(1);
        if (lastUom.length > 0) {
            const lastId = parseInt(lastUom[0].uomId.replace("UOM-", ""));
            uomId = "UOM-" + String(lastId + 1).padStart(3, "0");
        }
    } catch (err) {
        return res.status(500).json({ message: "Failed to fetch last UoM", error: err.message });
    }

    req.body.uomId = uomId; 
    const uom = new Uom(req.body);

    try {
        await uom.save();
        res.json({ message: "UoM added" });
    } catch (error) {
        console.error("Error saving UoM:", error);
        res.status(500).json({
            message: "UoM not added",
            error: error.message,
        });
    }
}


export async function getUom(req,res) {

    try{
        const uom = await Uom.find()
        res.json(uom)

    }
    catch(err){
        res.status(500).json({
            message : "Error getting UoM",
            error: err
        })
    }
}


export async function getUomById(req, res) {
    const uomId = req.params.uomId

    try{
        const uom = await Uom.findOne({uomId : uomId})
        if (uom == null) {
            res.status(404).json({
                message : "UoM not found"
            })
            return
        }

        if(uom.isActive == true){
            res.json(brand)
        }
        else{
            if(!isAdmin(req)){
                res.status(404).json({
                message : "UoM not found"
            })
            return
            }
            else{
                res.json(uom)
            }                
        }
    }

    catch(err){
        res.status(500).json({
            message : "Error getting UoM",
            error: err
        })
    }
}



export async function deleteUom(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "You are not authorized to delete UoM"
        });
        return;
    }

    try {
        const result = await Uom.deleteOne({ uomId: req.params.uomId });

        if (result.deletedCount === 0) {
            // No dispenser found with that ID
            res.status(404).json({
                message: "UoM not found"
            });
            return;
        }

        res.json({
            message: "UoM deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to delete UoM",
            error: err.message || err
        });
    }
}



export async function updateUom(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "You are not authorized to update UoM"
        });
        return;
    }

    const uomId = req.params.uomId;
    const updatingData = req.body;

    try {
        const result = await Uom.updateOne({ uomId: uomId }, updatingData);

        if (result.matchedCount === 0) {
            // No dispenser found with that ID
            res.status(404).json({
                message: "UoM not found"
            });
            return;
        }

        res.json({
            message: "UoM updated successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to update UoM",
            error: err.message || err
        });
    }
}