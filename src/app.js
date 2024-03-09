import express from 'express';
import cors from "cors"
import cookieParser from 'cookie-parser';
import {verifyToken} from './middleware/auth.js';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './utils/swagger.js';

const app= express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cookieParser())
app.use(passport.initialize())

app.get('/',verifyToken, (req, res) => {
    res.status(200).json({
        message:"reached home route"
    })
})

app.get('/healthcheck', (req, res) => {
    res.status(200).json({
        message:"The server is working fine"
    })
})

//import routes
import userRouter from './routes/user.route.js';
import listingRouter from "./routes/listing.route.js"
import collegeRouter from "./routes/college.route.js"
import bookmarkRouter from "./routes/bookmark.route.js"
import reviewRouter from "./routes/review.route.js"
//using routes
app.use('/api/user', userRouter);
app.use("/api/listing",verifyToken,listingRouter)
app.use("/api/college",verifyToken,collegeRouter)
app.use("/api/bookmark",verifyToken,bookmarkRouter)
app.use("/api/review",verifyToken,reviewRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export {app}
