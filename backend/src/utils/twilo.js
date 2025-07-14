import twilio from "twilio"
import dotenv from "dotenv"
dotenv.config();
const accountSid = process.env.Account_SID;

const authToken = process.env.Auth_Token;
const mob = process.env.MOB

const client = twilio(accountSid, authToken)

export const otpsend = async (to, otp) => {
    try {
        const message= await client.messages
            .create({
                body: `hello your OTP is :${otp}`,
                to: to, // Text your number
                from: mob, // From a valid Twilio number
            })
            console.log(` OTP sent to ${to} | SID: ${message.sid}`);
            return true;
            
            
    } catch (error) {
        console.error("the message is dont send to your mobile",error);
        return false

    }
}