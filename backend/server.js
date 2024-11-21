import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import dotenv from "dotenv";
import {v2 as cloudinary} from "cloudinary";
import connectMongoDB from "./db/connectMongoDB.js"
import cookieParser from "cookie-parser";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
    

const app = express();

const PORT = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(express.json({limit:"5mb"})) ;//To parse request body
// limit shouldn't be too high to prevent DOS attack
app.use(express.urlencoded({extended:true})); //To parse form data (urlencoded)
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/notifications",notificationRoutes);

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
    connectMongoDB();
});