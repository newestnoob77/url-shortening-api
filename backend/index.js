import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { mongooseConnect } from './src/config/mongoose.config.js';
import { ApplicationError } from './src/middleware/application.Error.js';
import { urlRouter } from './src/feature/url.router.js';
import cors from 'cors'
import mongoose from "mongoose";
const app=express();
app.use(cors({
    orgin:"http://localhost:3000",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
app.use(express.json());
app.use("/api/url"  ,urlRouter)
app.use((err,req,res,next)=>{
if(err instanceof ApplicationError){
return res.status(err.statusCode).send(err.message)
}
if(err instanceof mongoose.Error.ValidationError){
    return res.status(400).send(err.message)
}
})
app.listen(5000,async ()=>{
    console.log("Server is running on port 5000");
    await mongooseConnect();
})
