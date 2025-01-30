import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import adminRoutes from './routes/admin.routes.js';
import postRoutes from './routes/post.routes.js';
import userRoutes from './routes/user.routes.js';
import userPostsRoutes from './routes/userPost.routes.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use(adminRoutes);
app.use(postRoutes);
app.use(userRoutes);
app.use(userPostsRoutes);
app.use(express.static("uploads"));

app.get("/",(req, res)=>{
    return res.json({message:"Server is runing"})
})
app.get("/check",(req, res)=>{
    return res.json({message:"Server checking"})
})


const database = async()=>{
    const connectDB = await mongoose.connect("mongodb+srv://nikhil:nikhil@cluster0.07hcy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("connected to databse")
}
database();

const PORT = 9090
app.listen(PORT,()=>{
    console.log("Server is running on Port", PORT)
})

