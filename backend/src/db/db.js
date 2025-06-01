import mongoose from "mongoose";
const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to Mongodb");
        
    }
    catch(err){
        console.error("error to connct",err);
        process.exit(1); //exit we use for debugging

    }
};

export default connectDB;