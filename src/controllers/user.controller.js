import {User} from '../models/user.model.js';
import { Owner } from '../models/owner.model.js';
import {Student} from "../models/student.model.js"
import { userRegisterValidation } from '../validations/user.validation.js';
import joi from 'joi';

const { ValidationError } = joi;

import {Types} from 'mongoose';
import jwt from "jsonwebtoken"
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

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

        res.send(new ApiResponse(201,"User Created Successfully",createdUser))
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({ message: error.details[0].message,success:false });
        }
        return res.status(500).json({ error: error.message });
    }
}
const loginUser = async (req,res)=>{
    try {
        if(req.user instanceof ApiError) throw req.user;
        const {_id,firstName,lastName,email,role,verified} = req.user;
            const token = jwt.sign({_id,firstName,lastName,email,role,verified},process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRY })
            const options = {
                httpOnly: true,
                };
                res.cookie("token", token, options).send(new ApiResponse(200,`Logged in as ${firstName} ${lastName}`))
        } catch (error) {
            res.send({
                statusCode:error.statusCode,
                message:error.message,
                success:error.success
            })
        }
}
const deleteUser =async (req, res) => {
    const {userId} = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(402,"User not found")
        }
        // check owner
        if (user.role === 'owner') {
            await Owner.findOneAndDelete({ user: userId });

            await Listing.deleteMany({ propertyOwner: user._id }); // delete all property
        }

        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(error.statusCode).json({
            statusCode:error.statusCode,
            message: error.message,
            success:error.success 
        });
    }
} 
const updateUser =async (req,res)=>{
    if(!req.params.userId){
        throw new ApiError(403,"User ID not provided")
    }
    else{
        try {
            const id=new Types.ObjectId(req.params.userId);
            console.log(id);
            const user = await User.findOne({_id:id});
            
            if(!user) throw new ApiError(404,"User not found")
    
            const {firstName,lastName,email,idProof} = req.body;
            const updates = {};
            if (firstName) updates.firstName = firstName;
            if (lastName) updates.lastName = lastName;
            if (email) updates.email = email;
            if (idProof) updates.idProof = idProof;
            const updatedUser = await User.findOneAndUpdate( {_id:id},updates,{new:true} )
    
            res.status(200).json({message:"User updated",updatedUser})
        } catch (error) {
                res.json({
                statusCode:error.statusCode,
                message: error.message,
                success:error.success 
            });
        }
    }
}

const showUser =async (req,res)=>{
    if(!req.params.userId){
        throw new ApiError(404,"User ID not given")
    }
    else{
        try {
            const id=new Types.ObjectId(req.params.listingId);

            const user =  await User.findById(id)

            if(!user) throw new ApiError(404,"User not found")

            res.send(new ApiResponse(201,"user found",user))
        } catch (error) {
            res.status(error.statusCode).json({
                statusCode:error.statusCode,
                message: error.message,
                success:error.success 
            });
        }
    }
}
const allUser = async (_,res)=>{
    try {
        const users =  await User.find({})
        res.send(new ApiResponse(200,"all users",users))
    } catch (error) {
        res.status(error.statusCode).json({
            statusCode:error.statusCode,
            message: error.message,
            success:error.success 
        });
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