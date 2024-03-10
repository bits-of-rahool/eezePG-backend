import {User} from '../models/user.model.js';
import { Owner } from '../models/owner.model.js';
import {Student} from "../models/student.model.js"
import { userRegisterValidation } from '../validations/user.validation.js';
import joi from 'joi';

const { ValidationError } = joi;

import mongoose from 'mongoose';
import jwt from "jsonwebtoken"

const registerUser = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        role,
        idProof,
    } = req.body;
    
    try {
        const validatedUser = await userRegisterValidation.validateAsync(req.body);
        console.log(validatedUser);
        const newUser = new User({
            firstName,
            lastName,
            email,
            role,
            password,
            idProof,
        });
    
        const createdUser = await newUser.save();
    
        if (createdUser.role === 'owner') {
            await Owner.create({ user: createdUser._id });
        } else {
            await Student.create({ user: createdUser._id });
        }
        newUser.password = undefined;
        res.status(200).json({
            message: "User registered successfully",
            createdUser,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({ error: error.details[0].message });
        }
        res.status(500).json({ error: error.message });
    }
}
const loginUser = async (req,res)=>{
    const {_id,firstName,lastName,email,role,verified} = req.user;
    try {
            const token = jwt.sign({_id,firstName,lastName,email,role,verified},process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRY })
            const options = {
                httpOnly: true,
                };
                res.status(200)
                .cookie("token", token, options)
                .send(`logged in as ${firstName}`)
        } catch (error) {
            res.status(501).json("error while generating token")
        }
}
const deleteUser =async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // check owner
        if (user.role === 'owner') {
            await Owner.findOneAndDelete({ user: userId });

            await Listing.deleteMany({ propertyOwner: user._id }); // delete all property
        }

        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error while deleting user:', error);
        res.status(500).json({ message: error.message });
    }
} 
const updateUser =async (req,res)=>{
    if(!req.params.userID){
        res.json("user ID not provided")
    }
    else{
        const id=new mongoose.Types.ObjectId(req.params.userID);

        const user = await User.findOne({_id:id});
        
        if(!user) res.status(404).json("user not found")

        const {firstName,lastName,email,idProof} = req.body;
        const updates = {};
        if (firstName) updates.firstName = firstName;
        if (lastName) updates.lastName = lastName;
        if (email) updates.email = email;
        if (idProof) updates.idProof = idProof;
        const updatedUser = await User.findOneAndUpdate( {_id:id},updates,{new:true} )

        res.status(200).json({message:"User updated",updatedUser})
    }
}
const showUser =async (req,res)=>{
    if(!req.params.userID){
        res.json("user ID not provided")
    }
    else{
        try {
            const id=new mongoose.Types.ObjectId(req.params.userID);
            const user =  await User.findOne({_id:id})
            res.status(200).json(user) 
        } catch (error) {
                console.log(error);
        }
    }
}
const allUser = async (_,res)=>{
    try {
        const users =  await User.find({})
        res.status(200).json(users) 
    } catch (error) {
            console.log(error);
    }
}

export 
{
    registerUser,
    loginUser,
    deleteUser,
    updateUser,
    showUser,
    allUser
}