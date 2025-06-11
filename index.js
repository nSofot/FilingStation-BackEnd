import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import userRouter from "./Routes/userRouter.js";

import productRouter from "./Routes/productRouter.js";
import categoryRouter from "./Routes/categoryRouter.js";
import brandRouter from "./Routes/brandRouter.js";
import uomRouter from "./Routes/uomRouter.js";

import customerRouter from "./Routes/customerRouter.js";
import supplierRouter from "./Routes/supplierRouter.js";
import dispenserRouter from "./Routes/dispenserRouter.js";
import transactionRouter from "./Routes/transactionRouter.js";



import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use(
    (req, res, next) => {
        const tokenString = req.header("Authorization")
        if(tokenString != null) {
            const token = tokenString.replace("Bearer ", "")
 
            jwt.verify(token, process.env.JWT_KEY,
            (err, decoded) => {
                if(decoded != null) {
                    req.user = decoded
                    next()
                } else {
                    res.status(403).json({
                        message : "Invalid token"
                    })
                }
            })
        } else {
            next()
        }
    }
)


mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("Connected to database");
})
.catch(() => {
    console.log("Connection failed");
})




app.use("/api/user", userRouter);
app.use("/api/user/login", userRouter);
app.use("/api/user/users", userRouter);

app.use("/api/customer", customerRouter);
app.use("/api/supplier", supplierRouter);

app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/uom", uomRouter);

app.use("/api/dispenser", dispenserRouter);
app.use("/api/transaction", transactionRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});