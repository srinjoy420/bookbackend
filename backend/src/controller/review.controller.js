import User from "../model/user.model.js";
import Book from "../model/book.model.js"
import Review from "../model/review.model.js"
import { ApiResponse } from "../utils/api-Response.js";
import { ApiError } from "../utils/Api-error.js"
export const addreview=async(req,res)=>{
   try {
     const {name,review,rating}=req.body;
    if(!name || !review || !rating){
        throw new ApiError(404,"all fileds are requiewd")
    }
    const book=await Book.findOne({name:name.toLowerCase().trim()})
    if(!book){
        throw new ApiError(400,"cant find the book")
    }
    const existingBookReview=await Review.findOne({
        userId:req.user._id,
        bookId:book._id
    })
    if (existingBookReview) {
      throw new ApiError(409, "You have already reviewed this book");
    }

    const newReview = await Review.create({
      userId: req.user._id,
      bookId: book._id,
      review,
      rating,
    reviewby: {
                id: req.user._id,
                name: `${req.user.firstname} ${req.user.lastname}`
            },
    });

    return res
      .status(201)
      .json(new ApiResponse(201, newReview, "Review added successfully"));
   } catch (error) {
     console.log("Error adding review:", error);
    throw new ApiError(500, "Something went wrong");
    
   }

    
    

}

/// by id
export const reviewBookid=async(req,res)=>{
  try {
    const {bookId}=req.params;
  // console.log(bookId);
  
  if(!bookId){
   throw new ApiError(404,"give that") 

  }
  
  const {review,rating}=req.body
  if(!review || !rating){
   throw new ApiError(404,"all fileds are required") 


  }
  
  const book=await Book.findById(bookId)
  // console.log(bookId); // find the book
  
  if(!book){
   throw new ApiError(404,"cant ffind that book") 


  }
  const newReview=await Review.create({
    userId: req.user._id,
      bookId: book._id,
    bookId,
     review,
     rating,
     reviewby: {
                id: req.user._id,
                name: `${req.user.firstname} ${req.user.lastname}`
            },

     

  })
  return res
      .status(201)
      .json(new ApiResponse(201, newReview, "Review added successfully"));
  } catch (error) {
    console.log("Error adding review:", error);
    throw new ApiError(500, "Something went wrong");
    
  }
  

}
export const getallReview=async(req,res)=>{

 try {
   const reviews=await Review.find()
   if(reviews.length===0){
     throw new ApiError(400,"there is no review avalible")
   }
     return res.status(200).json(new ApiResponse(200, reviews, "successfully got all reviews"));
 } catch (error) {
    console.log("cant fetch the boks", error);
          throw new ApiError(400, "sometheing went wrong")
  
 }
}
export const getreviewbyID=async(req,res)=>{
  try {
    const {bookId}=req.params;
    console.log(bookId);
    if(!bookId){
      throw new ApiError(404,"this field is required")
    }
    const book=await Book.findById(bookId);
    if(!book){
      throw new ApiError(404,"we cant find the book")

    }
    return res
      .status(201)
      .json(new ApiResponse(201, book, "got find the book"));
    
  } catch (error) {
     console.log("cant fetch the boks", error);
          throw new ApiError(400, "sometheing went wrong")
    
  }
}
