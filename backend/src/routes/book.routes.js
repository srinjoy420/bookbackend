import { Router } from "express";
import {isLoggedin,issheller} from "../middleware/auth.middleware.js"
import { AddBook, deleteBook,  getAllbooks, getBookbyid, getbookbyName, searchBooksByName, searchCatagory, updateBook, updateBookByName } from "../controller/book.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const bookrouter = Router();
bookrouter.post("/addbook",isLoggedin,issheller,AddBook)
bookrouter.get('/getallBooks',isLoggedin,getAllbooks)
bookrouter.get("/getbookbyname",getbookbyName);
bookrouter.get("/search",searchBooksByName);
bookrouter.get("/getbookbyid/:id", isLoggedin,getBookbyid);
bookrouter.put("/updatebook/:id", isLoggedin,issheller,updateBook);
bookrouter.put("/updatebookbyName",isLoggedin,issheller, updateBookByName);
bookrouter.delete("/delete",isLoggedin,issheller, deleteBook);
bookrouter.get("/books/catagory", searchCatagory);

export default bookrouter;

