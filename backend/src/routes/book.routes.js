import { Router } from "express";
import {isLoggedin,issheller} from "../middleware/auth.middleware.js"
import { AddBook, deleteBook,  getAllbooks, getBookbyid, getbookbyName, updateBook, updateBookbyname } from "../controller/book.controller.js";
const bookrouter = Router();
bookrouter.post("/addbook",isLoggedin,issheller,AddBook)
bookrouter.get('/getallBooks',isLoggedin,getAllbooks)
bookrouter.get("/getbookbyname", isLoggedin,getbookbyName);
bookrouter.get("/getbookbyid/:id", isLoggedin,getBookbyid);
bookrouter.put("/updatebook/:id", isLoggedin,issheller,updateBook);
bookrouter.put("/updatebookbyName",isLoggedin,issheller, updateBookbyname);
bookrouter.delete("/delete",isLoggedin,issheller, deleteBook);

export default bookrouter;

