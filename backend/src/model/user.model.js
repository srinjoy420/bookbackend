import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"
import {AvalibleUserRoles} from "../utils/constains.js"
const userSchema = new Schema({
    avatar: {
        type: String,

    },
    firstname: {
        type: String,
        require: true,
        lowercase: true,
        trim: true,
        index: true

    },
    lastname: {
        type: String,
        require: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password:{
        type:String,
         required:[true,"password is required"],
          minlength: [4,"minmum 4 charecter neede"]

    },
    isemailVerified:{
        type:Boolean,
        default:false


    },
    role:{
        type:String,
        enum:AvalibleUserRoles,
        default:AvalibleUserRoles.CUSTOMER
    },
    forgotpasswordtoken:{
        type:String,
    },
    forgotpasswordExpiry:{
        typr:Date
    },
      refreshToken:{
        type:String,
    },
    emailverificationtoken:{
        type:String,

    },
    emaiverificationexpiry:{
        type:Date,
    }


}, { timestamps: true })
userSchema.pre("save",function(next){
    if(this.firstname && this.lastname){
        const firstInitian=this.firstname.trim().charAt(0).toUpperCase();
        const lastnameinitial=this.lastname.trim().charAt(0).toUpperCase();
        this.avatar=`${firstInitian}${lastnameinitial}`
    }
    next();
})

//hased passwoed
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  //compare
userSchema.methods.ispasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
const User = mongoose.model("User", userSchema)
export default User