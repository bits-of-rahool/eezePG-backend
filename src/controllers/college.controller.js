import {College} from '../models/college.model.js'
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

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

        if(!newCollege) throw new ApiError(401, "College not created", false);

        return res.status(200).send(new ApiResponse(200,"College added successfully",newCollege));

    } catch (error) {
        res.status(error.statusCode ||400).json({
            statusCode:error.statusCode,
            message: error.message,
            success:error.success 
        });
    }
}
const deleteCollege = async (req,res)=>{
    try {
        if(!req.params.collegeId){
           throw new ApiError(400,"No College ID provided");
        }else{
            const deletedCollege = await College.findOneAndDelete({_id:req.params.listingId})
            if(!deletedCollege) throw new ApiError(400,"No College found with this ID");
            res.status(200).send(new ApiResponse(200,"College deleted successfully",deletedCollege));
        }
    } catch (error) {
        res.status(error.statusCode || 400).json({
            statusCode:error.statusCode,
            message: error.message,
            success:error.success 
        });
    }
}
const updateCollege = async (req,res)=>{
    if(!req.params.collegeId){
        throw new ApiError(400,"No College ID provided");
    }
    else{
        res.status(500).json("not implemented")
    }
}
const allCollege = async (req,res)=>{
    // sorting filtering pagination
    try {
       const allColleges = await College.find({}); 
       if(!allColleges) throw new ApiError(400,"Error during fetching colleges")
       res.status(200).send(new ApiResponse(200,"All colleges fetched successfully",allColleges));
    } catch (error) {
        res.status(error.statusCode ||400).json({
            statusCode:error.statusCode,
            message: error.message,
            success:error.success 
        }); 
    }
}

export 
{
    addCollege,
    allCollege,
    deleteCollege,
    updateCollege,
}