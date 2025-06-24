import User from "../model/user.model.js";
import Book from "../model/book.model.js"
import Order from "../model/order.model.js"
import { ApiResponse } from "../utils/api-Response.js";
import { ApiError } from "../utils/Api-error.js"

export const placeorder=async(req,res)=>{
   try {
     const {bookId}=req.params;
    console.log(bookId);
    
    if(!bookId){
        throw new ApiError(400,"the bookid is nedded ")
    }
    const{address,state,city,pincode}=req.body
    console.log(city,state,pincode);
    
    if(!address|| !state || !city || !pincode){
        throw new ApiError(404,"All fileds are required")

    }
    const book=await Book.findById(bookId);
    if(!book){
        throw new ApiError(404,"cant find the book")
    }
    console.log(book);
    const orderplaced=await Order.create({
    userId: req.user._id,
      bookId: book._id,
      address,
      state,
      city,
      pincode,
      orderedby:{
        id: req.user._id,
                name: `${req.user.firstname} ${req.user.lastname}`
      }

    })
     const populatedOrder = await Order.findById(orderplaced._id).populate("bookId", "name");
    return res
      .status(201)
      .json(new ApiResponse(201, populatedOrder, "book order succesfully"));
   } catch (error) {
    console.log("Error in ordering:", error);
        throw new ApiError(500, "Something went wrong");
    
   }
    

}
export const getorderbyId=async (req,res)=>{
  try {
    const {id} =req.params
    if(!id){
      throw new ApiError(400,"the id is required")

    }
    const order=await Order.findById(id);
    if(!order){
      throw new ApiError(404,"cant match with your orders please try again")
    }
     return res.status(200).json(new ApiResponse(200, order, "yeah we found your order"));

  } catch (error) {
    console.log("Error in finding order:", error);
        throw new ApiError(500, "error in finding the order ");
    
  }
}
export const getallorders=async(req,res)=>{
  try {
    const orders=await Order.find();
    if(orders.length===0){
      throw new ApiError(400,"make your first order there is no order")
    }
    return res.status(200).json(new ApiResponse(200, orders, "your all orders...."));

  } catch (error) {
     console.log("Error in finding order:", error);
        throw new ApiError(500, "some was wrong");
    
  }
  
}