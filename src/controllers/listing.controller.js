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

    const photos = req.files; // uploaded photos
    if(!photos.length) return res.status(400).json({ message: 'please upload photos' });
    const cloudLinks = await uploadToCloudinary(photos)??"photos not recieved"
    const coordinates  = location.split(",") 
    location ={
        type:'Point',
        coordinates
    }
    amenities = amenities.split(",")
    
    try {

        const validatedListing = await listingValidation.validateAsync(req.body);

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

        const updatedOwner = await Owner.findOneAndUpdate({_id:propertyOwnerID},{$push:{properties:newListing._id}},{new:true});

        res.status(200).json({
        message:"Listing added successfully",
        newListing
        }
        )
    } catch (error) {
        if(error instanceof ValidationError) res.status(401).json({message:"error during validation",error:error.details[0].message})
        console.log("error while adding listing: "+error)
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
    const {lat,long,dist}=req.params
    //check lat and long
    //check valid distacne -dist 
    const point ={
        type:'Point',
        coordinates:[parseFloat(long),parseFloat(lat)]
    }
    try {
        
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
        res.status(200).json({found})
    } catch (error) {
        console.log(`error while getting Listings ${error}`)
    }

}
const deleteListing = async (req, res) => {
    const listingId = req.params.listingID;

    try {
        // check listing exist
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        await Listing.findByIdAndDelete(listingId); //delete

        await Owner.updateOne({ properties: listingId }, { $pull: { properties: listingId } }); // update owner

        res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (error) {
        console.error('Error deleting listing:', error);
        res.status(500).json({ message: 'An error occurred while deleting listing' });
    }
}
const allListing = async (req,res)=>{
        // do sorting filtering pagination
        const listings =  await Listing.find({})
        .select(' -location')
        .exec();
        res.status(200).json(listings)
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