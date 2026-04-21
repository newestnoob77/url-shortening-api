import mongoose from "mongoose";
const urlSchema = new mongoose.Schema({
    longUrl:{type:String,required:true},
    shortCode:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},
    accessCount:{type:Number,default:1}
})
export const UrlModel=mongoose.model("Urls",urlSchema)