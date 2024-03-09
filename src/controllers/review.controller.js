import {Review} from '../models/review.model.js'
import { Types } from "mongoose";

const addReview = async (req,res)=>{
    let {rating,comment} = req.body;
    rating = parseInt(rating);
    try {
        const createdReview = await Review.create({
            user:req.params.userId,
            property:req.params.listingId,
            rating,
            comment
        })
        res.status(200).json(createdReview)
    } catch (error) {
        console.log(error);
    }
}
const deleteReview = async (req,res)=>{
    try {
        const deletedReview = await Review.findOneAndDelete({_id:req.params.reviewId})
        res.status(200).json(deletedReview)
    } catch (error) {
        res.json(error.message)
    }
}
const allReview = async (req,res)=>{
    const listingId = req.params.listingId;
    const id=new Types.ObjectId(req.params.listingId);
    const agg = [
        { $match: { property: id } },
    ];
    
    try {
        const allreviews = await Review.aggregate(agg);
        res.status(200).json(allreviews)
    } catch (error) {
        console.log(error);
    }
}

export 
{
    addReview,
    deleteReview,
    allReview,
}