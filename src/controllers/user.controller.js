import {User} from '../models/user.model.js';
import { Owner } from '../models/owner.model.js';
import {Student} from "../models/student.model.js"
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
        
        const newUser = new User({
            firstName,
            lastName,
            email,
            role,
            password,
            idProof,
        })

        const createdUser = await newUser.save();

        if(createdUser.role=='owner'){
            await Owner.create({user:createdUser._id})
        }
        else{
            await Student.create({user:createdUser._id});
        }
        newUser.password = undefined; 
        res.status(200).json({
        message:"user registered successfully",
        createdUser,
        }
        )
    } catch (error) {
        res.status(403).json({error:error.message})
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
                .send(`logged in as ${req.user.firstName}`)
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

            await Listing.deleteMany({ propertyOwner: user._id }); // delete all propeety
        }

        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error while deleting user:', error);
        res.status(500).json({ message: error.message });
    }
} 
const updateUser =async (req,res)=>{
    res.status(200).json("not implemented");
}
const showUser =async (req,res)=>{
    res.status(200).json("not implemented");
}

export 
{
    registerUser,
    loginUser,
    deleteUser
}