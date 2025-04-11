import Customer from "../models/customer.js";
import { isAdmin } from "./userController.js";


export function saveCustomer(req, res) {

    if(!isAdmin(req))
    {
        res.status(403).json({
            message : "You are not authorized to add customer"
        })
        return
    } 

    const customer = new Customer(req.body);

    customer
        .save()
        .then(() => {
            res.json({
                message: "Customer added"
            });
        })
        .catch(() => {
            res.json({
                message: "Customer not added"  
            });
    })
}   


export async function getCustomer(req,res) {
    try{
        const customers = await Customer.find()
        res.json(customers)
    }
    catch(err){
        res.status(500).json({
            message : "Error getting customers",
            error: err
        })
    }
}

export async function deleteCustomer(req, res) {
    if(!isAdmin(req))
    {
        res.status(403).json({
            message : "You are not authorized to delete customer"
        })
        return
    } 

    try{
        await Customer.deleteOne({customerId : req.params.customerId})

        res.json({
            message : "Customer deleted successfully"
        })
    }
    catch(err){
        res.status(500).json({
            message : "Failed to delete customer",
            error: err
        })
    }
}