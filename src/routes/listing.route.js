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

/**
 * @swagger
 * /api/listing:
 *   get:
 *     summary: get all listings
 *     description: get a list of all listings.
 *     responses:
 *       '200':
 *         description: A list of listings.
 */
router.get('/', allListing);

router.route('/:listingID')
    .get(listingByID)
    .delete(deleteListing)
    .put(updateListing);

/**
 * @swagger
 * /api/listing/search/{lat}/{long}/{dist}:
 *   get:
 *     summary: get listings near coordinates
 *     description:  get a list of listings near the specified coordinates within the specified distance.
 *     parameters:
 *       - in: path
 *         name: lat
 *         required: true
 *         description: Latitude coordinate.
 *         schema:
 *           type: string
 *       - in: path
 *         name: long
 *         required: true
 *         description: Longitude coordinate.
 *         schema:
 *           type: string
 *       - in: path
 *         name: dist
 *         required: true
 *         description: Distance in meters.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of listings near the specified coordinates.
 *       '400':
 *         description: Invalid request.
 */
router.get('/search/:lat/:long/:dist', listingsNear);

router.post("/addListing", upload, addListing);

export default router;
