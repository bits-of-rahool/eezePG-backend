import {Bookmark} from '../models/bookmark.model.js'
import { ApiResponse } from '../utils/ApiResponse.js';

const addBookmark = async(req,res)=>{
    try {
      const createdMark = await Bookmark.create({
         user:req.params.userId,
         property:req.params.listingId
      })
 
      const bookmark = await Bookmark.find(createdMark).populate("property");
 
      res.status(200).send(new ApiResponse(200,"Bookmark Added",bookmark));
    } catch (error) {
        res.status(error.statusCode||400).json({
            statusCode:error.statusCode,
            message: error.message,
            success:error.success 
        });
    }
}
const deleteBookmark = async(req,res)=>{
    try {
        const deletedBookmark = await Bookmark.findOneAndDelete({_id:req.params.bookmarkId},{new:true})
        res.status(200).send(new ApiResponse(200,"Bookmark Deleted Successfully",deletedBookmark));
    } catch (error) {
        res.status(error.statusCode||400 ).json({
            statusCode:error.statusCode,
            message: error.message,
            success:error.success 
        });
    }
}
const allBookmarks = async(req,res)=>{
    try {
        const allBookmarks = await Bookmark.find({user:req.params.userId})
        res.status(200).send(new ApiResponse(200,"Bookmarks Fetched",allBookmarks));
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
    addBookmark,
    deleteBookmark,
    allBookmarks,
}