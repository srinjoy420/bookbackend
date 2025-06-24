import mongoose, { Schema } from "mongoose";
const orderSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BOOK",
        required: true
    },
    address: {
        type: String,
        required: true

    },
    state: {
        type: String,
        required: true

    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    orderedby: {
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
const Order = mongoose.model("Order", orderSchema)
export default Order;