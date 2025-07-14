import cron from 'node-cron';
import User from "../model/user.model.js"

export const cleanOtp=cron.schedule('*/10 * * * *', async() => {
 try {
     const result=await User.updateMany(
        {otpexpiry:{$lt: new Date()}},
        {$unset:{OTP:"",otpexpiry:""}}

     )
     console.log("clean up the otp from the database after 10 min",result.modifiedCount);
     
 } catch (error) {
    console.log("cant workout",error);
    
    
 }
});