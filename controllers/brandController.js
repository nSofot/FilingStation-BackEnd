import Brand from "../models/brand.js";
import { isAdmin } from "./userController.js";


export async function AddBrand(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "You are not authorized to add brand",
        });
    }

    let brandId = "BRA-00001";

    try {
        const lastBrand = await Brand.find().sort({ createdAt: -1 }).limit(1);
        if (lastBrand.length > 0) {
            const lastId = parseInt(lastBrand[0].brandId.replace("BRA-", ""));
            brandId = "BRA-" + String(lastId + 1).padStart(5, "0");
        }
    } catch (err) {
        return res.status(500).json({ message: "Failed to fetch last brand", error: err.message });
    }

    req.body.brandId = brandId; 
    const brand = new Brand(req.body);

    try {
        await brand.save();
        res.json({ message: "Brand added" });
    } catch (error) {
        console.error("Error saving brand:", error);
        res.status(500).json({
            message: "Brand not added",
            error: error.message,
        });
    }
}


export async function getBrand(req,res) {

    try{
        const brand = await Brand.find()
        res.json(brand)

    }
    catch(err){
        res.status(500).json({
            message : "Error getting brand",
            error: err
        })
    }
}


export async function getBrandById(req, res) {
    const brandId = req.params.brandId

    try{
        const brand = await Brand.findOne({brandId : brandId})
        if (brand == null) {
            res.status(404).json({
                message : "Brand not found"
            })
            return
        }

        if(brand.isActive == true){
            res.json(brand)
        }
        else{
            if(!isAdmin(req)){
                res.status(404).json({
                message : "Brand not found"
            })
            return
            }
            else{
                res.json(brand)
            }                
        }
    }

    catch(err){
        res.status(500).json({
            message : "Error getting brand",
            error: err
        })
    }
}



export async function deleteBrand(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "You are not authorized to delete brand"
        });
        return;
    }

    try {
        const result = await Brand.deleteOne({ brandId: req.params.brandId });

        if (result.deletedCount === 0) {
            // No dispenser found with that ID
            res.status(404).json({
                message: "Brand not found"
            });
            return;
        }

        res.json({
            message: "Brand deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to delete brand",
            error: err.message || err
        });
    }
}



export async function updateBrand(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "You are not authorized to update brand"
        });
        return;
    }

    const brandId = req.params.brandId;
    const updatingData = req.body;

    try {
        const result = await Brand.updateOne({ brandId: brandId }, updatingData);

        if (result.matchedCount === 0) {
            // No dispenser found with that ID
            res.status(404).json({
                message: "Brand not found"
            });
            return;
        }

        res.json({
            message: "Brand updated successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to update brand",
            error: err.message || err
        });
    }
}