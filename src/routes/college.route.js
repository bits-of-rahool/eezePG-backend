import { 
    addCollege,
    allListing,
    deleteListing,
    updateListing,
    listingByID,
} from "../controllers/college.controller.js";

import { Router } from "express";

const router = Router();

//allListings
router
.get('/',allListing);

//listings by ID
router.route('/:listingID')
.get(listingByID)
.delete(deleteListing)
.put(updateListing);


//Create listings
router.route("/add-college")
.post(addCollege);





export default router;

