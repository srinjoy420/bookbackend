import mongoose, { Schema } from "mongoose";
const bookSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    author:{
        type:String,
        required: true,
        lowercase: true,

    },
    price:{
        type:Number,
        required: true,

    },
    slno:{
        type:String,
        

    },
    published:{
        type:Date,
        required: true,
        default:Date.now
        

    },
    bookAddedBy: {
     id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    required: true
  }
  },


}, { timestamps: true })
const Book=mongoose.model("BOOK",bookSchema);
export default Book;