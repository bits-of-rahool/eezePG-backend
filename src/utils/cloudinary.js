import {v2}  from "cloudinary"
import { promises as fs } from 'fs';

v2.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    secure:true
})

export const uploadToCloudinary =async (files)=>{

    if(!files.length){
        console.log(files);
        return null;
    }else{
        try {
            const uploadPromises = files.map(async (elem)=> await v2.uploader.upload(elem.path,{resource_type:"auto"}));
            const resolved = await Promise.all(uploadPromises);
            const urls = resolved.map(elem=>elem.url)
            files.map(async (elem)=> await fs.unlink(elem.path));
            return urls
        } catch (error) {
                console.log(error);
        }
    }
}