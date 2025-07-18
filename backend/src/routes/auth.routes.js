import { Router } from "express";
import { currentUser, deleteAccount, forgotpassword, loginUser, logoutUser, refreshacessToken, registerUser, resendEmailVerification, resetpassword, sendOtp, verifyOtp, verifyUser } from "../controller/auth.controller.js";
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
router.post("/sendotp",isLoggedin, sendOtp);
router.post("/loginwithOtp",isLoggedin, verifyOtp);
//delete account
router.delete("/deleteaccount",isLoggedin, deleteAccount);
//current user
router.get("/aboutuser",isLoggedin,currentUser)


export default router;
