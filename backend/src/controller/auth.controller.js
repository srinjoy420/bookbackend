
import User from "../model/user.model.js";
import { ApiResponse } from "../utils/api-Response.js";
import { ApiError } from "../utils/Api-error.js"
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


import nodemailer from "nodemailer"
import { sendmail, emailVerificationMailgenContent, forgotPasswordMailgenContent } from "../utils/mail.js"

const userIgnore = "-password -refreshToken -emailverificationtoken -emaiverificationexpiry -forgotpasswordtoken -forgotpasswordExpiry"
dotenv.config()

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError("User not found", 400);
    }

    const accessToken = user.generateAcessToken(); // check spelling!
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Generate Access and Refresh Token Error: ", error);
    throw new ApiError("Internal Server Down", 500);
  }
};



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
    const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${token}&email=${user.email}`;

    // Generate email content
    const mailContent = emailVerificationMailgenContent(`${user.firstname} ${user.lastname}`, verificationUrl);

    // Send the email
    await sendmail({
      email: user.email,
      subject: "Verify your email address",
      mailGenContent: mailContent,
    });
    // generate acces token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    )

    user.refreshToken = refreshToken;
    await user.save();
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    }
    res.cookie("AcessToken", accessToken, cookieOptions)



    // 5. Respond with created user (excluding password)
    res.status(201).json({
      message: "User created successfully",
      success: true,
      accessToken
      ,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        
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
  try {
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
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    )


    const cookieOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    }
    res.cookie("AcessToken", accessToken, cookieOptions)
    res.cookie("RefreshToken", refreshToken, cookieOptions)
    res.status(200).json({
      success: true,
      message: "loginsuccesfully",
      accessToken,
      user: {
        id: user._id,
        name: user.firstname,
        email: user.email,
        role: user.role

      }
    })
  } catch (error) {
    console.log("cant login", error);
    throw new ApiError(404, "something went wrong cant login")


  }


}
export const verifyUser = async (req, res) => {
  try {
    const { token } = req.params;
    console.log(token);
    const user = await User.findOne({ emailverificationtoken: token });
    if (!user) {
      throw new ApiError(404, "cant find the token");
    }
    user.isemailVerified = true;
    user.emailverificationtoken = undefined
    await user.save()
    res.status(200).json({
      success: true,
      message: "yes we found the user and succesfully verified",

    })

  } catch (error) {
    console.log("error to verify", error);
    throw new ApiError(404, "not verified")


  }

}
export const logoutUser = async (req, res) => {
  try {
    const cookieOptions = {
      httpOnly: true,

      secure: false,
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
    }
    res.cookie("AcessToken", "", cookieOptions)
    res.cookie("RefreshToken", '', cookieOptions)
    res.status(200).json({
      success: true,
      message: "loggedout succesfully"

    })
  } catch (error) {
    console.log("problem in loggingout", error);
    throw new ApiError(404, "something went wrong")


  }

}
export const resendEmailVerification = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new ApiError(404, "please enter your email ");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(404, "user not found");
    }
    if (user.isemailVerified) {
      throw new ApiError(400, "your email is already verrified");

    }
    const token = crypto.randomBytes(32).toString("hex");
    user.emailverificationtoken = token;
    await user.save();
    // send mail to tthe user
    const verificationUrl = `${process.env.BASE_URL}/resendEmailverification?token=${token}&email=${user.email}`
    const mailContent = emailVerificationMailgenContent(`${user.firstname} ${user.lastname}`, verificationUrl);

    // Send the email
    await sendmail({
      email: user.email,
      subject: "Verify your email address",
      mailGenContent: mailContent,
    });
    res.status(200).json(new ApiResponse(200, user, "send rmail verification succesfully"))
  } catch (error) {
    console.log("rensed emailverification token not sent", error);
    throw new ApiError(404, "something went wrong")



  }

}
export const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new ApiError(404, "email is required")
    }
    const user = await User.findOne({ email }).select(`-password`);
    if (!user) {
      throw new ApiError(404, "user noy found")
    }
    //user temporay tokenn for resend password
    const { unHasedToken, hasedToken, tokeExpiry } = user.generatetemporaryToken();
    user.forgotpasswordtoken = hasedToken;
    user.forgotpasswordExpiry = tokeExpiry;
    await user.save()
    //send mail to token to the user
    const passwordResetUrl = `${process.env.BASE_URL}/resetpassword?token=${unHasedToken}&email=${user.email}`;
    const mailContent = forgotPasswordMailgenContent(`${user.firstname} ${user.lastname}`, passwordResetUrl);
    // Send the email
    await sendmail({
      email: user.email,
      subject: "forgotpassword token has beeen send to your email",
      mailGenContent: mailContent,
    });
    res.status(200).json(new ApiResponse(200, user, "send  forgotpasswordToken succesfully"))



  } catch (error) {
    console.log("we cant send the forgotpassword token", error);
    throw new ApiError(400, "something went wrong please try again")


  }

}
export const resetpassword = async (req, res) => {
  try {
    const { token } = req.query;
    console.log(token);

    const { newpassword } = req.body;
    if (!token || !newpassword) {
      throw new ApiError(400, "the email and new password is neede")
    }
    const hasedToken = crypto.createHash("sha256").update(token).digest("hex")
    const user = await User.findOne({

      forgotpasswordtoken: hasedToken,
      forgotpasswordExpiry: { $gt: Date.now() }
    }).select("-password")
    if (!user) {
      throw new ApiError(404, "user not found")



    }
    user.password = newpassword;
    user.forgotpasswordtoken = undefined;
    user.forgotpasswordExpiry = undefined;
    await user.save();

    res.status(200).json(new ApiResponse(200, "reset password succesfully"))
  } catch (error) {
    console.log("reset has a problem", error);
    throw new ApiError(400, "something went wrong")


  }

}
export const refreshacessToken = async (req, res) => {
  try {
    const incomingToken = req.cookies?.RefreshToken
    if (!refreshacessToken) {
      throw new ApiError(401, "token not found")
    }
    const decode = jwt.verify(incomingToken, process.env.TOKEN_SECRET)
    console.log("decoded token", decode);
    const user = await User.findById(decode._id)
    if (!user) {
      throw new ApiError(401, "invalid refreshToken")
    }
    if (incomingToken !== user?.refreshToken) {
      throw new ApiError(400, "invalid credentials")

    }
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    }
    const { accessToken,newrefreshToken } = await generateAccessAndRefreshToken(
      user._id
    )
    res.cookie("AcessToken", accessToken, cookieOptions)
    res.cookie("RefreshToken", newrefreshToken, cookieOptions)
    res.status(200).json({
      success: true,
      message: "acessToken refreshed",
      accessToken,
      refreshToken:newrefreshToken
     
    })
     
    
  } catch (error) {
     console.log("problem in refresing acesstoken", error);
    throw new ApiError(400, "something went wrong")


  }



}