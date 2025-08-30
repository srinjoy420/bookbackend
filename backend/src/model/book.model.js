import mongoose, { Schema } from "mongoose";
const bookSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        lowercase: true,

    },
    price: {
        type: Number,
        required: true,

    },
    slno: {
        type: String,


    },
    published: {
        type: Date,
        required: true,
        default: Date.now


    },
      coverImage: {                     // <-- NEW FIELD
        type: String,
        default: "",                  // Cloudinary URL stored here
    },
    bookAddedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    catagory:{
        type: String, 
        required: true, 
        enum: ["Fiction", "Non-Fiction", "Science", "Technology", "History", "Other"], 
        
       
        
    }


}, { timestamps: true })
const Book = mongoose.model("BOOK", bookSchema);
export default Book;