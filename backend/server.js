import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from"./routes/protectedRoutes.js";



const app = express();
app.use(cors());
app.use(express.json());


/// db connection

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Mongodb connected"))
.catch((err)=> console.error("Mongo Db connection error: ", err));


app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('server is running');
})