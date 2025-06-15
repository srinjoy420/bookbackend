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