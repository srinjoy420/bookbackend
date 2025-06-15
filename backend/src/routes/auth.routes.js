import { Router } from "express";
import { forgotpassword, loginUser, logoutUser, registerUser, resendEmailVerification, resetpassword, verifyUser } from "../controller/auth.controller.js";
import {isLoggedin} from "../middleware/auth.middleware.js"

const router = Router();

// Register route
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verifyemail/:token",isLoggedin, verifyUser);
router.get("/logout", isLoggedin,logoutUser);
router.post("/forgotpassword", forgotpassword);
router.post("/resendemailVarification", resendEmailVerification);
router.post("/resetpassword", resetpassword);


export default router;
