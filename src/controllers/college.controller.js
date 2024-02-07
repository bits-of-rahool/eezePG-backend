import {College} from '../models/college.model.js'
import mongoose from 'mongoose';

const addCollege = async (req, res) => {
    let {
        name,
        location,
        address,
    } = req.body;
    
    
    try {
        
        const newCollege = await College.create({
        name,
        location,
        address,
        })

        res.status(200).json({
        message:"Listing added successfully",
        newCollege
        }
        )
    } catch (error) {
        console.log("error while adding listing: "+error)
    }
}
const listingByID = async (req,res)=>{
    
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
        
}

export 
{
    addCollege,
    allListing,
    deleteListing,
    updateListing,
    listingByID,
}