import { 
    addListing,
    allListing,
    deleteListing,
    updateListing,
    listingByID,
    listingsNear
} from "../controllers/listing.controller.js";

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

router
.get('/search/:lat/:long/:dist',listingsNear);

//Create listings
router.route("/addListing")
.post(addListing);





export default router;

