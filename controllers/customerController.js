import Customer from "../models/customer.js";
import { isAdmin } from "./userController.js";


export async function CreateCustomer(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "You are not authorized to add customer",
        });
    }

    let customerId = "CUS-00001";

    try {
        const lastCustomer = await Customer.find().sort({ createdAt: -1 }).limit(1);
        if (lastCustomer.length > 0) {
            const lastId = parseInt(lastCustomer[0].customerId.replace("CUS-", ""));
            customerId = "CUS-" + String(lastId + 1).padStart(5, "0");
        }
    } catch (err) {
        return res.status(500).json({ message: "Failed to fetch last customer", error: err.message });
    }

    req.body.customerId = customerId;
    req.body.createdAt = new Date(); 

    console.log("Incoming customer data:", req.body);

    const customer = new Customer(req.body);

    try {
        await customer.save();
        res.json({ message: "Customer added" });
    } catch (error) {
        console.error("Error saving customer:", error);
        res.status(500).json({
            message: "Customer not added",
            error: error.message,
        });
    }
}


export async function getCustomer(req,res) {

    try{
        if(isAdmin(req)){
            const customers = await Customer.find()
            res.json(customers)
        }
        else{
            const customers = await Customer.find({status : "Active"})
            res.json(customers)
        }

    }
    catch(err){
        res.status(500).json({
            message : "Error getting customers",
            error: err
        })
    }
}


export async function getCustomerById(req, res) {
    const customerId = req.params.customerId

    try{
        const customer = await Customer.findOne({customerId : customerId})
        if (customer == null) {
            res.status(404).json({
                message : "Customer not found"
            })
            return
        }

        if(customer.status == "Active"){
            res.json(customer)
        }
        else{
            if(!isAdmin(req)){
                res.status(404).json({
                message : "Customer not found"
            })
            return
            }
            else{
                res.json(customer)
            }                
        }
    }

    catch(err){
        res.status(500).json({
            message : "Error getting customer",
            error: err
        })
    }
}



export async function deleteCustomer(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "You are not authorized to delete customer"
        });
        return;
    }

    try {
        const result = await Customer.deleteOne({ customerId: req.params.customerId });

        if (result.deletedCount === 0) {
            // No customer found with that ID
            res.status(404).json({
                message: "Customer not found"
            });
            return;
        }

        res.json({
            message: "Customer deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to delete customer",
            error: err.message || err
        });
    }
}



export async function updateCustomer(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "You are not authorized to update customer"
        });
        return;
    }

    const customerId = req.params.customerId;
    const updatingData = req.body;

    try {
        const result = await Customer.updateOne({ customerId: customerId }, updatingData);

        if (result.matchedCount === 0) {
            // No customer found with that ID
            res.status(404).json({
                message: "Customer not found"
            });
            return;
        }

        res.json({
            message: "Customer updated successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to update customer",
            error: err.message || err
        });
    }
}
