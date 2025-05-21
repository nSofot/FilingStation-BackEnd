import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export async function createUser(req, res) {

    if(req.body.role != "Admin") {
        if(req.user !=null){
            if(req.user.role != "Admin") {
               res.status(403).json({
                   message : "You are not authorized to add admin account"
               })
               return
            }
        }
        else{
            res.status(403).json({
               message : "You are not authorized to add users. Please login first"
            })
            return
        }
    }

    //Generate User Id
    let UserId = "USR-00001"

    const lastUser = await User.find().sort({createdAt : -1}).limit(1)

    if (lastUser.length > 0) {
        const lastUserId = lastUser[0].userId
        const lastUserIdNumber = parseInt(lastUserId.replace("USR-", ""))
        const newUserIdNumber = (parseInt(lastUserIdNumber)+1)
        UserId = "USR-"+String(newUserIdNumber).padStart(4, '0')
    }

    const hashpassword = bcrypt.hashSync(process.env.JWT_KEY+req.body.password, 10);

    const user = new User({
        userId: UserId,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobile: req.body.mobile,
        password: hashpassword,
        role: req.body.role,
        isActive: req.body.status,
        image: req.body.image,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
    });
    
    user
    .save()
    .then(() => {
        res.json({
            message: "User added"
        });    
    })
    .catch(() => {
        res.json({
            message: "User not added"
        });
    })  
}

export function loginUsers(req, res) {
    const email = req.body.email
    const password = process.env.JWT_KEY+req.body.password

    User.findOne({ email: email })
    .then(
    (user => {
        if (user == null) {
            res.status(404).json({
                message: "User not found"
            })
        } else {
            const isPasswordValid = bcrypt.compareSync(password, user.password)
            if (isPasswordValid) {
                const token = jwt.sign(
                {
                    userId: user.userId,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    role: user.role,
                    image: user.image
                },
                process.env.JWT_KEY,
                )
                res.status(200).json({
                    message: "Login successful",
                    token : token
                })
            } else {
                res.status(401).json({
                    message: "Invalid password"
                })
            }   
        }}
    ))
}



export async function deleteUser(req, res) {
    if(!isAdmin(req))
    {
        res.status(403).json({
            message : "You are not authorized to delete users"
        })
        return
    } 

    try{
        const result = await User.deleteOne({ userId: req.params.userId });

        if (result.deletedCount === 0) {
            // No customer found with that ID
            res.status(404).json({
                message: "User not found"
            });
            return;
        }

        res.json({
            message : "User deleted successfully"
        })
    }
    catch(err){
        res.status(500).json({
            message : "Failed to delete user",
            error: err
        })
    }
}



export async function updateUser(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "You are not authorized to update user"
        });
        return;
    }

    const userId = req.params.userId;
    const updatingData = req.body;

    try {
        const result = await User.updateOne({ userId: userId }, updatingData);

        if (result.matchedCount === 0) {
            // No product found with that ID
            res.status(404).json({
                message: "User not found"
            });
            return;
        }

        res.json({
            message: "User updated successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to update user",
            error: err
        });
    }
}




export async function getUsers(req,res) {

    try{
        if(isAdmin(req)){
            const users = await User.find()
            res.json(users)
        }
        else{
            res.status(403).json({
                message : "You are not authorized to get users"
            })
        }
    }
    catch(err){
        res.status(500).json({
            message : "Error getting users",
            error: err
        })
    }
}


export function isAdmin(req) {
    if(req.user == null) {
        return false
    }

    if(req.user.role != "Admin") {
        return false
    }

    // if(req.user.isActive =false) {
    //     return false
    // }
    return true
}