import {Schema,model} from "mongoose";

const reviewSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,ref:"User",
        required:true
    },
    property:{
        type: Schema.Types.ObjectId,ref:"Listing",
        required:true
    },
    rating:{
        type:Number,
        enum:[1,2,3,4,5],
        required:true
    },
    comment:{
        type:String,
        required:true,
    }
},{timestamps:true})

const Review = model('Review', reviewSchema);

export {Review}