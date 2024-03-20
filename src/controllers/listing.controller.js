import {Listing} from '../models/listing.model.js'
import {Owner} from '../models/owner.model.js'
import mongoose from 'mongoose';
import { listingValidation } from '../validations/listing.validation.js';
import Joi from 'joi';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
const { ValidationError } = Joi;

const addListing = async (req, res) => {
    let {
        name,
        description,
        propertyOwner,
        listingType,
        location,
        address,
        rent,
        contract,
        availability,
        amenities,
    } = req.body;
    
    const propertyOwnerID = new mongoose.Types.ObjectId(propertyOwner); // string to objectID
    try {
    const photos = req.files; // uploaded photos
    if(!photos.length) throw new ApiError(400,"Please provide atleast one photo");
    const cloudLinks = await uploadToCloudinary(photos)??"photos not recieved"
    const coordinates  = location.split(",")
    location ={
        type:'Point',
        coordinates
    }

        amenities = amenities.split(",")

        await listingValidation.validateAsync(req.body);

        const newListing = await Listing.create({
        name,
        description,
        propertyOwner,
        listingType,
        location,
        address,
        rent,
        contract,
        availability,
        amenities,
        photos:cloudLinks
        })

        await Owner.findOneAndUpdate({_id:propertyOwnerID},{$push:{properties:newListing._id}},{new:true});

        res.status(200).send(new ApiResponse(200,"Listing added successfully",newListing))
    } catch (error) {
        console.log(error.message);
        if(error instanceof ValidationError) return res.status(400).json({
            statusCode:400,
            message: error.details[0].message,
            success:false 
        }); // joi validation error
        else{
            return res.status(400).json({
                statusCode:error.statusCode,
                message: error.message,
                success:error.success,
            });
        }
    }
}
const listingByID = async (req,res)=>{

    try {
        if(!req.params.listingID){
            throw new ApiError(403,"listing ID not provided")
        }
        else{
            const id=new mongoose.Types.ObjectId(req.params.listingID);
            const property = await Listing.findOne({_id:id})
            .populate({
                path:"propertyOwner",
                select:'-_id',
                populate:{
                    path:'properties',
                },
                populate:{
                    path:'user',
                    select:"firstName lastName verified -_id"
                },
            }).select('-_id -location').exec();
            
            if(!property) throw new ApiError(403,"no property with this id")
            else res.send(new ApiResponse(200,"Property Fetched Successfully",property))
        }
    } catch (error) {
        res.status(401).json({
            statusCode:error.statusCode,
            success:error.success,
            message:error.message,
        })
    }
}
const listingsNear = async (req,res)=>{
    let {lat,long,dist}=req.params
    lat = parseFloat(lat);
    long = parseFloat(long);
    try {
        
        if(lat>90 || lat<-90 || long>180 || long<-180 ) throw new ApiError(400,"Please provide valid coordinates")
        const point ={
            type:'Point',
            coordinates:[long,lat]
        }
        const found = await Listing.aggregate([
            { 
                $geoNear: { 
                    near: point, 
                    distanceField: "distance",
                    maxDistance:dist*1000
                }
            },
            {
                $project: {
                _id: 0,
                name:1,
                description:1,
                listingType:1,
                address:1,
                rent:1,
                contract:1,
                availability:1,
                distance: { $divide: ["$distance", 1000] }
                }
            }
        ])
        res.status(200).send(new ApiResponse(200,"search done",found))
    } catch (error) {
        res.status(error.statusCode).json({
            statusCode:error.statusCode,
            message: error.message,
            success:error.success 
        });
    }

}
const deleteListing = async (req, res) => {
    try {
        const listingId = req.params.listingID;
        if(!listingId) throw new ApiError(400,"Please provide Listing ID")
        // check listing exist
        const listing = await Listing.findById(listingId);
        if (!listing) throw new ApiError(400,"Listing not found")
        const deletedListing = await Listing.findByIdAndDelete(listingId); //delete
        await Owner.updateOne({ properties: listingId }, { $pull: { properties: listingId } }); // update owner
        
        return res.status(200).send(new ApiResponse(200,"Listing deleted successfully",deletedListing))
    } catch (error) {

        res.status(400).json({
            statusCode:error.statusCode,
            message: error.message,
            success:error.success 
        });
    }
}
const allListing = async (req,res)=>{
        // sorting filtering pagination
        try {
            const listings =  await Listing.find({})
            .select(' -location')
            .exec();
            res.status(200).send(new ApiResponse(200,"All Listings Fecthed",listings))
        } catch (error) {
            res.status(error.statusCode).json({
                statusCode:error.statusCode,
                message: error.message,
                success:error.success 
            });
        }
}
const updateListing = async (req,res)=>{
        res.json("Not implemented yet")
}

export 
{
    addListing,
    allListing,
    deleteListing,
    updateListing,
    listingByID,
    listingsNear
}