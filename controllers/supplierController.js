import Supplier from "../models/supplier.js";
import { isAdmin } from "./userController.js";


export async function CreateSupplier(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "You are not authorized to add suppliers",
        });
    }

    let supplierId = "SUP-00001";

    try {
        const lastSupplier = await Supplier.find().sort({ createdAt: -1 }).limit(1);
        if (lastSupplier.length > 0) {
            const lastId = parseInt(lastSupplier[0].supplierId.replace("SUP-", ""));
            supplierId = "SUP-" + String(lastId + 1).padStart(5, "0");
        }
    } catch (err) {
        return res.status(500).json({ message: "Failed to fetch last supplier", error: err.message });
    }

    req.body.supplierId = supplierId;
    req.body.createdAt = new Date(); 

    const supplier = new Supplier(req.body);

    try {
        await supplier.save();
        res.json({ message: "Supplier added" });
    } catch (error) {
        console.error("Error saving supplier:", error);
        res.status(500).json({
            message: "Supplier not added",
            error: error.message,
        });
    }
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


export async function getSupplierById(req, res) {
    const supplierId = req.params.supplierId

    try{
        const supplier = await Supplier.findOne({supplierId : supplierId})
        if (supplier == null) {
            res.status(404).json({
                message : "Supplier not found"
            })
            return
        }

        if(supplier.isActive == true){
            res.json(supplier)
        }
        else{
            if(!isAdmin(req)){
                res.status(404).json({
                message : "Supplier not found"
            })
            return
            }
            else{
                res.json(supplier)
            }                
        }
    }

    catch(err){
        res.status(500).json({
            message : "Error getting supplier",
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


export async function searchSuppliers(req, res) {
    const searchQuery = req.query.query || "";

    try {
        const regex = { $regex: searchQuery, $options: "i" };

        const filter = {
            isActive: true,
            ...(searchQuery.trim() !== "" && {
                $or: [
                    { name: regex },
                    { address: regex },
                    { mobile: regex },
                    { phone: regex } 
                ]
            })
        };

        const suppliers = await Supplier.find(filter);
        res.json(suppliers);
    } catch (err) {
        res.status(500).json({
            message: "Error searching suppliers",
            error: err
        });
    }
}


export async function addSupplierBalance(req, res) {    
  
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Not authorized" });
    }

    const { updates } = req.body;

    if (!updates || !Array.isArray(updates)) {
        return res.status(400).json({ message: "updates array is required" });
    }

    // Validate first
    const invalidEntries = updates.filter(
        ({ supplierId, amount }) => !supplierId || typeof amount !== 'number'
    );
    if (invalidEntries.length > 0) {
        return res.status(400).json({
            message: "Invalid supplier updates",
            invalidEntries
        });
    }

    try {
        const results = await Promise.allSettled(
            updates.map(({ supplierId, amount }) =>
                Supplier.updateOne(
                    { supplierId },
                    {
                        $inc: { balance: amount }, // can be positive or negative
                        $set: { updatedAt: new Date() }
                    }
                )
            )
        );

        const failed = results
            .map((res, i) => res.status === 'rejected' ? updates[i].supplierId : null)
            .filter(Boolean);

        res.json({
            message: failed.length === 0
                ? "Supplier balances updated successfully"
                : "Some supplier updates failed",
            failedSuppliers: failed
        });
    } catch (err) {
        console.error("Bulk addition failed:", err);
        res.status(500).json({
            message: "Failed to update supplier balances",
            error: err.message || err
        });
    }
}


// export async function subtractSupplierBalance(req, res) {
//     if (!isAdmin(req)) {
//         return res.status(403).json({ message: "Not authorized" });
//     }

//     const { updates } = req.body;
//     if (!updates || !Array.isArray(updates)) {
//         return res.status(400).json({ message: "updates array is required" });
//     }

//     try {
//         const updatePromises = updates.map(({ supplierId, amount }) => {
//             if (!supplierId || typeof amount !== 'number') {
//                 throw new Error(`Invalid data for supplierId: ${supplierId}`);
//             }

//             return Supplier.updateOne(
//                 { supplierId },
//                 {
//                     $inc: { balance: -Math.abs(amount) }, // subtracting as negative increment
//                     $set: { updatedAt: new Date() },
//                 }
//             );
//         });

//         await Promise.all(updatePromises);

//         res.json({ message: "Supplier balances subtracted successfully" });
//     } catch (err) {
//         console.error("Balance subtraction failed:", err);
//         res.status(500).json({
//             message: "Failed to subtract supplier balance",
//             error: err.message || err,
//         });
//     }
// }

export async function subtractSupplierBalance(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Not authorized" });
    }

    const { updates } = req.body;
    if (!updates || !Array.isArray(updates)) {
        return res.status(400).json({ message: "updates array is required" });
    }

    try {
        for (const { supplierId, amount } of updates) {
            if (!supplierId || typeof amount !== 'number') {
                throw new Error(`Invalid data for supplierId: ${supplierId}`);
            }

            const supplier = await Supplier.findOne({ supplierId });
            if (!supplier) {
                console.warn(`Supplier not found: ${supplierId}`);
                continue;
            }

            // Ensure balance is a number
            supplier.balance = Number(supplier.balance) || 0;

            // Subtract amount
            supplier.balance -= Math.abs(amount);
            supplier.updatedAt = new Date();

            await supplier.save();
        }

        res.json({ message: "Supplier balances subtracted successfully" });
    } catch (err) {
        console.error("Balance subtraction failed:", err);
        res.status(500).json({
            message: "Failed to subtract supplier balance",
            error: err.message || err,
        });
    }
}
