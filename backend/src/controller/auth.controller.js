
import User from "../model/user.model.js";
import { ApiResponse } from "../utils/api-Response.js";
import { ApiError } from "../utils/Api-error.js"
import crypto from "crypto";

import nodemailer from "nodemailer"
import { sendmail, emailVerificationMailgenContent } from "../utils/mail.js"



export const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;
    console.log("role", role);


    // 1. Validate fields
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }




    // 4. Create user
    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
      role
    });
    // save the emailverification token 
    const token = await crypto.randomBytes(32).toString("hex");
    user.emailverificationtoken = token;
    await user.save();
    //send mail to the user
    // Build your verification link (adjust frontend URL)
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}&email=${user.email}`;

    // Generate email content
    const mailContent = emailVerificationMailgenContent(`${user.firstname} ${user.lastname}`, verificationUrl);

    // Send the email
    await sendmail({
      email: user.email,
      subject: "Verify your email address",
      mailGenContent: mailContent,
    });



    // 5. Respond with created user (excluding password)
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      },
    });
  } catch (error) {
    console.error("User creation failed:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new ApiError(404, "all filelds are required")
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "user not found please singup")
  }
  const isPasswordMatch = await user.ispasswordCorrect(password);
  if (!isPasswordMatch) {
    throw new ApiError(404, "password not match")
  }
  //generate acess token
  const generateAcessToken = await user.generateAcessToken();
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  }

}
