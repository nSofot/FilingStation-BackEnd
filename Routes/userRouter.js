import express from "express";
import { createUser } from "../controllers/userController.js";
import { loginUsers } from "../controllers/userController.js";
import { getUsers } from "../controllers/userController.js";
import { updateUser } from "../controllers/userController.js";
import { deleteUser } from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login", loginUsers);
userRouter.get("/users", getUsers);
userRouter.put("/:userId", updateUser);
userRouter.delete("/:userId", deleteUser);

export default userRouter;