import { Router } from "express";
import { forgotpassword, loginUser, logoutUser, refreshacessToken, registerUser, resendEmailVerification, resetpassword, verifyUser } from "../controller/auth.controller.js";
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
router.post("/refreshacessToken", refreshacessToken);
//otp routes


export default router;
