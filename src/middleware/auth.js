import jwt from "jsonwebtoken"
import passport from "passport";
import LocalStrategy from "passport-local";
import GoogleStrategy from "passport-google-oauth2"
import  {User} from "../models/user.model.js";
import { ApiError } from '../utils/ApiError.js';
import bcrypt from "bcryptjs"

passport.use(new LocalStrategy(
    async function(email, password, done) {
        let user = await User.findOne({email}).select("-idProof");
        if(!user) return done(null, new ApiError(403,"User not found"),{message:"user not found"});
        if(!bcrypt.compareSync(password,user.password)) return done(null, new ApiError(403,"Password is incorrect"),{message:"incorrect password"});
        user["password"]='';
        return done(null, user);
    }
));

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/user/auth/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    let user = await User.findOne({email:profile.email})
    if(!user){
        //create a new user
        const newUser = new User({
            firstName:profile.given_name,
            lastName:profile.family_name,
            email:profile.email,
            avatar:profile.picture
        })
        user = await newUser.save();
    }
    return done(null, user);
  }
));

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    try {
        if (!token) throw new ApiError(400,"Unauthorised access. Please Login")

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        // console.log("Error during JWT verification: " + error.message);
        return res.status(error.statusCode ||400).json({
            statusCode:error.statusCode,
            message: error.message,
            success:error.success 
        });
    }
};

const googleCallback = (req, res) => {
    const { _id, firstName, lastName, email, role, verified } = req.user;
    try {
      const token = jwt.sign({ _id, firstName, lastName, email, role, verified }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
      const options = {
        httpOnly: true,
      };
      res.status(200)
        .cookie("token", token, options)
        .redirect("/");
    } catch (error) {
      console.log("error while generating token");
    }
};

export {
    verifyToken,
    googleCallback
};