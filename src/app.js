import express from 'express';
import cors from "cors"
import cookieParser from 'cookie-parser';
import {verifyToken} from './middleware/auth.js';
import passport from 'passport';

const app= express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cookieParser())
app.use(passport.initialize())

app.get('/api/healthcheck', (req, res) => {
    res.status(200).send(new ApiResponse(200,"The Server Is Running Fine",null));
})

//import routes
import userRouter from './routes/user.route.js';
import listingRouter from "./routes/listing.route.js"
import collegeRouter from "./routes/college.route.js"
import bookmarkRouter from "./routes/bookmark.route.js"
import reviewRouter from "./routes/review.route.js"
import amenitiesRouter from "./routes/amenities.route.js"
import { ApiResponse } from './utils/ApiResponse.js';
//using routes
app.use('/api/user', userRouter);
app.use("/api/listing",verifyToken,listingRouter)
app.use("/api/college",verifyToken,collegeRouter)
app.use("/api/bookmark",verifyToken,bookmarkRouter)
app.use("/api/review",verifyToken,reviewRouter)
app.use("/api/amenities",verifyToken,amenitiesRouter)

export {app}
