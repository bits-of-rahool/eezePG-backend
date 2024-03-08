import { 
    addCollege,
    deleteCollege,
    updateCollege,
    allCollege
} from "../controllers/college.controller.js";

import { Router } from "express";

const router = Router();

//allListings
router
.get('/',allCollege);

//listings by ID
router.route('/:listingID')
.delete(deleteCollege)
.put(updateCollege);

//Create listings
router.route("/add-college")
.post(addCollege);

export default router;