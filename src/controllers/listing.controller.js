import {Listing} from '../models/listing.model.js'
import {Owner} from '../models/owner.model.js'
import mongoose from 'mongoose';

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
        amenities
    } = req.body;
    
    const propertyOwnerID = new mongoose.Types.ObjectId(propertyOwner); // string to objectID
    
    try {
        
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
        amenities
        })

        const updatedOwner = await Owner.findOneAndUpdate({_id:propertyOwnerID},{$push:{properties:newListing._id}},{new:true});

        res.status(200).json({
        message:"Listing added successfully",
        newListing
        }
        )
    } catch (error) {
        console.log("error while adding listing: "+error)
    }
}
const listingByID = async (req,res)=>{
    if(!req.params.listingID){
        console.log(req.params)
        res.json("listing by ID not provided")
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
        res.status(200).json(property)
    }
}
const listingsNear = async (req,res)=>{
    const {lat,long,dist}=req.params
    //check lats and long 
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
 const deleteListing = async (req,res)=>{
    if(req.params.listingID){
        res.json("listing by ID not implemented")
    }
    else{
        res.status(500).json("not implemented")
    }
}
 const updateListing = async (req,res)=>{
    if(req.params.listingID){
        res.json("listing by ID not implemented")
    }
    else{
        res.status(500).json("not implemented")
    }
}
const allListing = async (req,res)=>{
        // sorting filtering pagination
        const listings =  await Listing.find({})
        .select(' -location')
        .exec();
        res.status(200).json(listings)
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