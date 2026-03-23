import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from"./utils/db.js"; 
import userRoutes from "./routes/user.route.js";
import companyRoutes from "./routes/company.route.js";
import jobRoutes from "./routes/job.route.js";  
import applicationRoutes from "./routes/application.route.js";
 
dotenv.config({});

const app=express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions={
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));

const PORT=process.env.PORT || 3000;

// api's

app.use("/api/v1/user",userRoutes);
app.use("/api/v1/company",companyRoutes);
app.use("/api/v1/job",jobRoutes);
app.use("/api/v1/application",applicationRoutes);

// "https://localhost:8000/apiv1/user/register"
// "https://localhost:8000/apiv1/user/login"
// "https://localhost:8000/apiv1/user/profile/update"

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`)
})