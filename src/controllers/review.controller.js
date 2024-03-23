import {Review} from '../models/review.model.js'
import { Types } from "mongoose";
import {ApiResponse} from "../utils/ApiResponse.js"
import { ApiError } from '../utils/ApiError.js';

const addReview = async (req,res)=>{
    let {rating,comment} = req.body;
    rating = parseInt(rating);
    try {
        if(!req.params.listingId) throw new ApiError(400,"No listing Id is provided")
        if(!req.params.userId) throw new ApiError(400,"No user Id is provided")
        const createdReview = await Review.create({
            user:req.params.userId,
            property:req.params.listingId,
            rating,
            comment
        })
        res.status(200).send(new ApiResponse(200,"Review created successfully",createdReview));
    } catch (error) {
        res.status(error.statusCode || 400).json({
            statusCode:error.statusCode,
            message: error.message,
            success:error.success 
        });
    }
}
const deleteReview = async (req,res)=>{
    try 
    {
        if(!req.params.reviewId) throw new ApiError(400,"No review Id provided")
        const deletedReview = await Review.findOneAndDelete({_id:req.params.reviewId})
        if(!deletedReview) throw new ApiError(404,"No review with this review Id exists")
        res.status(200).send(new ApiResponse(200,"Review deleted successfully",deletedReview));
    } catch (error) {
        res.status(error.statusCode ||400).json({
            statusCode:error.statusCode,
            message: error.message,
            success:error.success 
        });
    }
}
const allReview = async (req,res)=>{
    const listingId = req.params.listingId;
    
    try {
        const id=new Types.ObjectId(req.params.listingId);
        const agg = [
            { $match: { property: id } },
        ];
        if(!listingId) throw new ApiError(404,"Please provide listing ID")
        const allreviews = await Review.aggregate(agg);
        res.status(200).send(new ApiResponse(200,"All reviews fetched successfully",allreviews));
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
    addReview,
    deleteReview,
    allReview,
}