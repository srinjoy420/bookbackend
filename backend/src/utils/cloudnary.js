import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"//our file system
import dotenv from "dotenv"
dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET// Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudnary=async (localFilepath)=>{
    try {
        if(!localFilepath) return null
        //upload file
        const response=await cloudinary.uploader.upload(localFilepath,{
            resource_type:"auto"
        })
        //file has been uploated succesfully
        console.log("file upload succesfull on cloudneray",response.url);
        return response
        
    } catch (error) {
        fs.unlinkSync(localFilepath) //remove the locallysavedtemporaryfile as upload failed
        return null
    }
}


export {uploadOnCloudnary}