import Book from "../model/book.model.js"
import { ApiResponse } from "../utils/api-Response.js";
import { ApiError } from "../utils/Api-error.js"

export const AddBook = async (req, res) => {
    try {
        const { name, author, price, published, slno } = req.body;
        if (!name || !author || !price || !published || !slno) {
            throw new ApiError(404, "all field are required")

        }

        const ExistBook = await Book.findOne({ name: name.toLowerCase().trim()  })
        if (ExistBook) {
            throw new ApiError(409, "book exist already")



        }
        const book = await Book.create({
            name,
            author, published,
            price,
            slno,
            bookAddedBy: req.user._id,
        })
        return res.status(200).json(new ApiResponse(200, book, "Book added successfully"));


    } catch (error) {
        console.log("cant add the book", error);
        throw new ApiError(400, "something went wrong")




    }

}
export const getAllbooks = async (req, res) => {
    try {
        const books = await Book.find().populate("bookAddedBy", "firstname lastname email");
        if (books.length === 0) {
            throw new ApiError(404, "there is no books")
        }
        return res.status(200).json(new ApiResponse(200, books, "successfully got all books"));
    } catch (error) {
        console.log("cant fetch the boks", error);
        throw new ApiError(400, "sometheing went wrong")


    }

}
export const getbookbyName = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            throw new ApiError(404, "no book found");


        }
        const book = await Book.findOne({ name: name.toLowerCase().trim() }).populate("bookAddedBy", "firstname lastname email");
        return res.status(200).json(new ApiResponse(200, book, "here is your book"))
    } catch (error) {
        console.log("cant fetch the boks", error);
        throw new ApiError(400, "sometheing went wrong")

    }


}
export const getBookbyid = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new ApiError(404, "user nott found please try again")
        }
        const book = await Book.findById(id).populate("bookAddedBy", "firstname lastname email");
        if (!book) {
            throw new ApiError(404, "we found no books such this id")
        }
        return res.status(200).json(new ApiResponse(200, book, "successfully got the book"));
    } catch (error) {
        console.log("cant fetch the bok", error);
        throw new ApiError(400, "sometheing went wrong")

    }


}
export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new ApiError(404, "dont find the book ")


        }
        const { name, author, price, published, slno } = req.body;
        if (!name || !author || !price || !published || !slno) {
            throw new ApiError(404, "all field are required")

        }
        const updatebook = await Book.findByIdAndUpdate(id, {
            name,
            author, published,
            price,
            slno,

        })
        return res.status(200).json(new ApiResponse(200, updateBook, "Book update successfully"));



    } catch (error) {
        console.log("cant update the book", error);
        throw new ApiError(400, "sometheing went wrong")

    }

}
export const updateBookByName = async (req, res) => {
    try {
      const { name, author, price, published, slno } = req.body;
  
      if (!name || !author || !price || !published || !slno) {
        throw new ApiError(400, "All fields are required");
      }
  
      const updatedBook = await Book.findOneAndUpdate(
        { name: name.toLowerCase().trim() },
        { author, price, published, slno },
        { new: true, runValidators: true }
      );
  
      if (!updatedBook) throw new ApiError(404, "Book not found");
  
      return res.status(200).json(new ApiResponse(200, updatedBook, "Book updated successfully"));
    } catch (error) {
      console.error("Error updating book by name:", error);
      return res.status(error.statusCode || 500).json(new ApiError(error.statusCode || 500, error.message || "Something went wrong"));
    }
  };
export const deleteBook = async (req, res) => {
    try {
        const{name}=req.body;
        if(!name){
             throw new ApiError(404, "user nott found please try again")
        }
        const book=await Book.findOne({name})
        if(!book){
             throw new ApiError(404, "Book nott found please try again")
        }
        await book.deleteOne({name})
        return res.status(200).json(new ApiResponse(200, book, "successfully delete the book"));
    } catch (error) {
          console.log("cant delete the book", error);
        throw new ApiError(400, "sometheing went wrong")
        
    }

}