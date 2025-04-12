import Transaction from "../models/transaction.js";
import { isAdmin } from "./userController.js";


export function saveTransaction(req, res) {

    if(!isAdmin(req))
    {
        res.status(403).json({
            message : "You are not authorized to add transaction"
        })
        return
    } 

    const transaction = new Transaction(req.body);

    transaction
        .save()
        .then(() => {
            res.json({
                message: "Transaction added"
            });
        })
        .catch(() => {
            res.json({
                message: "Transaction not added"  
            });
    })
}   


export async function getTransaction(req,res) {
    try{
        const transactions = await Transaction.find()
        res.json(transactions)
    }
    catch(err){
        res.status(500).json({
            message : "Error getting transaction",
            error: err
        })
    }
}

export async function deleteTransaction(req, res) {
    if(!isAdmin(req))
    {
        res.status(403).json({
            message : "You are not authorized to delete transaction"
        })
        return
    } 

    try{
        await Transaction.deleteOne({transactionId : req.params.transactionId})

        res.json({
            message : "Transaction deleted successfully"
        })
    }
    catch(err){
        res.status(500).json({
            message : "Failed to delete transaction",
            error: err
        })
    }
}