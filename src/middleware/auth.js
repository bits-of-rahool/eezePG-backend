import jwt from "jsonwebtoken"
import passport from "passport";
import LocalStrategy from "passport-local";
import GoogleStrategy from "passport-google-oauth2"
import  {User} from "../models/user.model.js";
import bcrypt from "bcryptjs"

passport.use(new LocalStrategy(
    async function(email, password, done) {
        let user = await User.findOne({email}).select("-idProof");
        if(!user) return done(null, false,{message:"user not found"});
        if(!bcrypt.compareSync(password,user.password)) return done(null, false,{message:"incorrect password"});
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
    if (!token) {
        return res.status(403).json("Unauthorized access, please login");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("Error during JWT verification: " + error.message);
        return res.status(403).json("Unauthorized access, please login");
    }
};

export default verifyToken;