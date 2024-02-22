import passport from "passport";
import {  registerUser,loginUser,deleteUser } from "../controllers/user.controller.js";
import { Router } from "express";
import jwt from 'jsonwebtoken'
const router = Router();

router.route("/register")
.post(registerUser);

router.delete('/delete-user/:userId', deleteUser);

router.post("/login",passport.authenticate('local', { session: false }),loginUser)

router.get('/auth/google',passport.authenticate('google', { scope:[ 'email', 'profile' ],session: false })); // user is redirected to google for auth

router.get( '/auth/google/callback',passport.authenticate( 'google', { session: false }),(req,res)=>{ // user comes back with access and refresh
    const {_id,firstName,lastName,email,role,verified} = req.user;
    try {
            const token = jwt.sign({_id,firstName,lastName,email,role,verified},process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRY })
            const options = {
                httpOnly: true,
                };
                res.status(200)
                .cookie("token", token, options)
                .redirect("/")
        } catch (error) {
            console.log("error while generating token")
        }
});

router.get('/logout', (req, res) => {
    req.logout(() => {});
    res.clearCookie('token').send("logged out"); 
});


export default router;