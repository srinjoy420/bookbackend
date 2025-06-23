import mongoose, { Schema } from "mongoose";

const reviewSchema=new Schema({
   userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
   },
    bookId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"BOOK",
        required: true
    },
    review:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
     reviewby: {
         id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      name: {
        type: String,
        required: true
      }
      }
},{timestamps: true })
const Review=mongoose.model("ReVIEW",reviewSchema);
export default Review;