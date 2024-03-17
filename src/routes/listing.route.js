import { 
    addListing,
    allListing,
    deleteListing,
    updateListing,
    listingByID,
    listingsNear
} from "../controllers/listing.controller.js";
import { upload } from "../utils/multer.js";
import { Router } from "express";

const router = Router();

router.get('/all', allListing);

router.route('/id/:listingID')
    .get(listingByID)
    .delete(deleteListing)
    .put(updateListing);

router.get('/search/:lat/:long/:dist', listingsNear);

router.post("/addListing", upload, addListing);

export default router;
