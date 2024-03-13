import {v2}  from "cloudinary"

v2.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    secure:true
})

export const uploadToCloudinary =async (files)=>{
    console.log("uploading to cloud");

    if(!files){
        return null;
    }else{
        
        const photoPromises = files.map(async (elem)=>{
             try {
                return await v2.uploader.upload(elem.path,{resource_type:"auto"})
             } catch (error) {
                console.log(error);
             }
        })

        const resolved = await Promise.all(photoPromises);
        const urls = resolved.map(elem=>elem.url)
        return urls
    }
}