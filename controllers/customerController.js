import Customer from "../models/customer.js";
import { isAdmin } from "./userController.js";


export async function CreateCustomer(req, res) {

    if(!isAdmin(req))
    {
        res.status(403).json({
            message : "You are not authorized to add customer"
        })
        return
    } 


    // Customer Id generate
    let customerId = "CUS-00001"

    const lastCustomer = await Customer.find().sort({ createdAt: -1 }).limit(1);


    if (lastCustomer.length > 0) {
        const lastCustomerId = lastCustomer[0].customerId
        const lastCustomerIdNumber = parseInt(lastCustomerId.replace("CUS-", ""))
        const newCustoemerIdNumber = (parseInt(lastCustomerIdNumber)+1)
        customerId = "CUS-"+String(newCustoemerIdNumber).padStart(5, '0')
    }

    req.body.customerId = customerId
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
