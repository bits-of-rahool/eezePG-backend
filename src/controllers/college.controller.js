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
        res.status(501).json({message:"error while adding listing: "})
    }
}
 const deleteCollege = async (req,res)=>{
    if(req.params.listingID){
        res.json("listing by ID not implemented")
    }
    else{
        res.status(500).json("not implemented")
    }
}
 const updateCollege = async (req,res)=>{
    if(req.params.listingID){
        res.json("listing by ID not implemented")
    }
    else{
        res.status(500).json("not implemented")
    }
}
const allCollege = async (req,res)=>{
        // sorting filtering pagination
        
}

export 
{
    addCollege,
    allCollege,
    deleteCollege,
    updateCollege,
}