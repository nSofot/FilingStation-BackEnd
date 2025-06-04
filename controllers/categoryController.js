import Category from "../models/category.js";
import { isAdmin } from "./userController.js";


export async function AddCategory(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "You are not authorized to add category",
        });
    }

    let categoryId = "CAT-0001";

    try {
        const lastCategory = await Category.find().sort({ createdAt: -1 }).limit(1);
        if (lastCategory.length > 0) {
            const lastId = parseInt(lastCategory[0].categoryId.replace("CAT-", ""));
            categoryId = "CAT-" + String(lastId + 1).padStart(4, "0");
        }
    } catch (err) {
        return res.status(500).json({ message: "Failed to fetch last category", error: err.message });
    }

    req.body.categoryId = categoryId;
    const category = new Category(req.body);

    try {
        await category.save();
        res.json({ message: "Category added" });
    } catch (error) {
        console.error("Error saving category:", error);
        res.status(500).json({
            message: "Category not added",
            error: error.message,
        });
    }
}


export async function getCategory(req,res) {

    try{
        const category = await Category.find()
        res.json(category)

    }
    catch(err){
        res.status(500).json({
            message : "Error getting category",
            error: err
        })
    }
}


export async function getCategoryById(req, res) {
    const categoryId = req.params.categoryId

    try{
        const category = await Category.findOne({categoryId : categoryId})
        if (category == null) {
            res.status(404).json({
                message : "Category not found"
            })
            return
        }

        if(category.isActive == true){
            res.json(category)
        }
        else{
            if(!isAdmin(req)){
                res.status(404).json({
                message : "Category not found"
            })
            return
            }
            else{
                res.json(category)
            }                
        }
    }

    catch(err){
        res.status(500).json({
            message : "Error getting category",
            error: err
        })
    }
}



export async function deleteCategory(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "You are not authorized to delete category"
        });
        return;
    }

    try {
        const result = await Category.deleteOne({ categoryId: req.params.categoryId });

        if (result.deletedCount === 0) {
            // No dispenser found with that ID
            res.status(404).json({
                message: "Category not found"
            });
            return;
        }

        res.json({
            message: "Category deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to delete Category",
            error: err.message || err
        });
    }
}



export async function updateCategory(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "You are not authorized to update category"
        });
        return;
    }

    const categoryId = req.params.categoryId;
    const updatingData = req.body;

    try {
        const result = await Category.updateOne({ categoryId: categoryId }, updatingData);

        if (result.matchedCount === 0) {
            // No dispenser found with that ID
            res.status(404).json({
                message: "Category not found"
            });
            return;
        }

        res.json({
            message: "Category updated successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to update category",
            error: err.message || err
        });
    }
}