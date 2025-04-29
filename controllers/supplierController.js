import Supplier from "../models/supplier.js";
import { isAdmin } from "./userController.js";


export function saveSupplier(req, res) {

    if(!isAdmin(req))
    {
        res.status(403).json({
            message : "You are not authorized to add supplier"
        })
        return
    } 

    const supplier = new Supplier(req.body);

    supplier
        .save()
        .then(() => {
            res.json({
                message: "Supplier added"
            });
        })
        .catch(() => {
            res.json({
                message: "Supplier not added"  
            });
    })
}   


export async function getSupplier(req,res) {
    try{
        const suplliers = await Supplier.find()
        res.json(suplliers)
    }
    catch(err){
        res.status(500).json({
            message : "Error getting suppliers",
            error: err
        })
    }
}

export async function deleteSupplier(req, res) {
    if(!isAdmin(req))
    {
        res.status(403).json({
            message : "You are not authorized to delete supplier"
        })
        return
    } 

    try{
        const result = await Supplier.deleteOne({supplierId : req.params.supplierId})

        if (result.deletedCount === 0) {
            // No customer found with that ID
            res.status(404).json({
                message: "Customer not found"
            });
            return;
        }

        res.json({
            message : "Supplier deleted successfully"
        })
    }
    catch(err){
        res.status(500).json({
            message : "Failed to delete supplier",
            error: err
        })
    }
}

export async function updateSupplier(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "You are not authorized to update supplier"
        });
        return;
    }

    const supplierId = req.params.supplierId;
    const updatingData = req.body;

    try {
        const result = await Supplier.updateOne({ supplierId: supplierId }, updatingData);

        if (result.matchedCount === 0) {
            // No customer found with that ID
            res.status(404).json({
                message: "Supplier not found"
            });
            return;
        }

        res.json({
            message: "Supplier updated successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to update supplier",
            error: err.message || err
        });
    }
}