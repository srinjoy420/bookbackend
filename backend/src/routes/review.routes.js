import { Router } from "express";
import {isLoggedin,issheller} from "../middleware/auth.middleware.js"
import { addreview,reviewBookid ,getallReview, getreviewbyID, deletereview} from "../controller/review.controller.js";
const reviewRouter = Router();
reviewRouter.post("/addreview",isLoggedin,addreview)
reviewRouter.post("/reviewid/:bookId",isLoggedin,reviewBookid)
reviewRouter.get("/getallreview",isLoggedin,getallReview)
reviewRouter.get("/getreviewbyid/:bookId",isLoggedin,getreviewbyID)
reviewRouter.delete("/deletebyid/:id",isLoggedin,issheller,deletereview)

export default reviewRouter;