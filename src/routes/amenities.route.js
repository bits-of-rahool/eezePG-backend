import { Router } from "express";
import { Amenities } from "../models/listing.model.js";

const router = Router();

router.post("/add-amenity",async (req,res)=>{
        const {name,description,icon} = req.body
        try {
            const amenity = await Amenities.create({
                name,
                description,
                icon
            })
            res.status(200).send(new ApiResponse(200,"Amenity added successfully",amenity));

        } catch (error) {
            if(error.code===11000) return res.json(`amenity with with the name ${name} already exists`)
            else return res.status(error.statusCode ||400).json({
                statusCode:error.statusCode,
                message: error.message,
                success:error.success 
            });
        }
})

router.delete("/delete-amenity/:name",async (req,res)=>{
    const name=req.params.name;
    try {
        const deleted = await Amenities.deleteOne({name});
        if(!deleted) return res.json(`No amenity with the name: ${name}`)
        res.status(200).send(new ApiResponse(200,"Amenity deleted successfully",deleted));
    } catch (error) {
        res.status(error.statusCode ||400).json({
            statusCode:error.statusCode,
            message: error.message,
            success:error.success 
        });
    }
})

router.get("/all-amenities",async (req,res)=>{
    try {
        const allAmenities = await Amenities.find();
        res.status(200).send(new ApiResponse(200,"All amenities fetched",allAmenities));
    } catch (error) {
        res.status(error.statusCode ||400).json({
            statusCode:error.statusCode,
            message: error.message,
            success:error.success 
        });
        
    }
})

export default router