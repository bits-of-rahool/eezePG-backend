import { Router } from "express";
import { addBookmark, allBookmarks, deleteBookmark } from "../controllers/bookmark.controllers.js";

const router = Router();

router.post("/add-bookmark/:userId/:listingId",addBookmark)
router.delete("/delete-bookmark/:bookmarkId",deleteBookmark)
router.get("/get-bookmarks/:userId",allBookmarks)

export default router