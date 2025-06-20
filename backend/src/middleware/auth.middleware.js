import jwt from "jsonwebtoken";
import express from "express";
import { ApiResponse } from "../utils/api-Response.js";
import { ApiError } from "../utils/Api-error.js";
import dotenv from "dotenv";
dotenv.config()
export const isLoggedin = async (req, res, next) => {
    try {
        console.log(req.cookies);
        const token = req.cookies?.generateAcessToken;
        console.log("token found ", token ? "YES" : "NO");
        if (!token) {
            throw new ApiError(401, "no token found ");

        }
        const decode=jwt.verify(token,process.env.TOKEN_SECRET);
        console.log("decoded data",decode);
        req.user=decode

        
    } catch (error) {
        console.log("auth middlewere failure");
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })

    }
    next()


}
//middleweere to check the role is sheller or not
export const issheller = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const role = req.user?.role;

    if (!userId || role !== "sheller") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized as a seller.",
      });
    }

    // Proceed to the next middleware/handler
    next();
  } catch (error) {
    console.error("Middleware error in issheller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
