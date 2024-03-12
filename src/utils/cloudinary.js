import {v2 as cloudinary}  from "cloudinary"

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    secure:true
})

export const uploadToCloudinary =async (filePath)=>{
    console.log("uploading to cloud");
    if(!filePath){
        return null;
    }else{
        const result = await cloudinary.uploader.upload(filePath,{resource_type:"auto"},(err,result)=>{
            console.log("error while uploading to clouidnary"+err);
        })
        console.log(result.url);
        return result.url
    }
}



