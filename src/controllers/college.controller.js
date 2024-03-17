import {College} from '../models/college.model.js'
import { ApiError } from '../utils/ApiError.js';

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

        if(!newCollege) throw new ApiError(401, "testing error", false);
            
        res.status(200).json({message:"Listing added successfully",newCollege})

    } catch (err) {
        res.status(err.statusCode).json(err)
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