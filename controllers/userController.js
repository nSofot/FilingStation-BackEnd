import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export function isAdmin(req) {
    return req.user && req.user.role === "Admin";
}


// Create User
export async function createUser(req, res) {
    try {
        const { email, firstname, lastname, mobile, password, role, isActive, image } = req.body;

        if (role === "Admin") {
            if (!req.user || req.user.role !== "Admin") {
                return res.status(403).json({ message: "Only admins can create another admin user." });
            }
        } else {
            if (!req.user) {
                return res.status(403).json({ message: "Please login first to add users." });
            }
        }

        // Auto-generate User ID
        let newUserId = "USR-0001";

        try {
            const lastUser = await User.find().sort({ createdAt: -1 }).limit(1);
            if (lastUser.length > 0) {
                const lastId = parseInt(lastUser[0].userId.replace("USR-", ""));
                newUserId= "USR-" + String(lastId + 1).padStart(4, "0");
            }
        } catch (err) {
            return res.status(500).json({ message: "Failed to fetch last user", error: err.message });
        }


        // Hash password
        const hashedPassword = bcrypt.hashSync(process.env.JWT_KEY + password, 10);

        const user = new User({
            userId: newUserId,
            email,
            firstname,
            lastname,
            mobile,
            password: hashedPassword,
            role,
            isActive,
            image,
        });

        await user.save();

        res.status(201).json({ message: "User added successfully" });

    } catch (err) {
        console.error("Create User Error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

// Login User
export async function loginUsers(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const valid = bcrypt.compareSync(process.env.JWT_KEY + password, user.password);
        if (!valid) return res.status(401).json({ message: "Invalid password" });

        const token = jwt.sign({
            userId: user.userId,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role,
            image: user.image
        }, process.env.JWT_KEY);

        res.json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ message: "Login failed", error: err.message });
    }
}


// Delete User
export async function deleteUser(req, res) {
    if(!isAdmin(req))
    {
        res.status(403).json({
            message : "You are not authorized to delete user"
        })
        return
    } 

    try{
        const result = await User.deleteOne({userId : req.params.userId})

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


// Update User
export async function updateUser(req, res) {
    if (!isAdmin(req)) return res.status(403).json({ message: "Unauthorized access" });

    try {
        const { userId } = req.params;
        const result = await User.updateOne({ userId }, req.body);

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to update user", error: err.message });
    }
}

// Get All Users
export async function getUsers(req, res) {
    if (!isAdmin(req)) return res.status(403).json({ message: "Unauthorized access" });

    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch users", error: err.message });
    }
}
