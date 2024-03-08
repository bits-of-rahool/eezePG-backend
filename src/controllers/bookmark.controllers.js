import {Bookmark} from '../models/bookmark.model.js'
import mongoose from 'mongoose';

const addBookmark = async(req,res)=>{
    try {
      const createdMark = await Bookmark.create({
         user:req.params.userId,
         property:req.params.listingId
      })
 
     //  const bookmark = await Bookmark.find(createdMark).populate("property");
 
      res.status(200).json(createdMark);
    } catch (error) {
         res.json({error:error.message});
    }
 
 }

const deleteBookmark = async(req,res)=>{
    try {
        const deletedBookmark = await Bookmark.findOneAndDelete({_id:req.params.bookmarkId},{new:true})
        res.status(200).json(deletedBookmark)
    } catch (error) {
        res.json({error:error.message})
    }
}
const allBookmarks = async(req,res)=>{
    try {
        const allBookmarks = await Bookmark.find({user:req.params.userId})
        res.status(200).json(allBookmarks)
    } catch (error) {
        res.json({error:error.message})
    }
}

export 
{
    addBookmark,
    deleteBookmark,
    allBookmarks,
}