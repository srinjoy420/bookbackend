import { Router } from "express";
import {isLoggedin,issheller} from "../middleware/auth.middleware.js"
import { getallorders, getorderbyId, placeorder } from "../controller/order.controller.js";
const oderRouter = Router();
oderRouter.post("/placeorder/:bookId",isLoggedin,placeorder)
oderRouter.get("/getorderbyId/:id",isLoggedin,getorderbyId)
oderRouter.get("/allorders",isLoggedin,getallorders)

export default oderRouter