import { Router } from "express";
import { addReview, deleteReview, allReview } from "../controllers/review.controller.js";

const router = Router();

router.post("/add-review/:userId/:listingId",addReview)
router.delete("/delete-review/:reviewId",deleteReview)
router.get("/get-reviews/:listingId",allReview)

export default router