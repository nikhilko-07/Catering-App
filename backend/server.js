import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import adminRoutes from './routes/admin.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(adminRoutes);
app.use(userRoutes);
app.use(express.static("uploads"));

app.get("/", (req, res) => {
    return res.json({ message: "Server is running" });
});

app.get("/check", (req, res) => {
    return res.json({ message: "Server checking" });
});

const database = async () => {
    try {
        await mongoose.connect("mongodb+srv://Nikhil:Nikhil%40123@cluster0.sv8e3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Database connection error:", err);
    }
};
database();

const PORT = 9090;
app.listen(PORT, () => {
    console.log("Server is running on Port", PORT);
});
