import mongoose from 'mongoose';
export const  mongooseConnect=async()=>{
    try{
await mongoose.connect(process.env.MONGO_URL)
console.log("Mongoose connected successfully");
    }
    catch(err){
        console.log(err);
    }
}