import {Owner} from '../models/owner.model.js'
import {User} from '../models/user.model.js';

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
        
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password,
            role,
            idProof,
        })

        if(newUser.role=='owner'){
            var newOwner = await Owner.create({
                user:newUser._id
            })

        }
        else{
            // it is student
        }
    
        res.status(200).json({
        message:"user registered successfully",
        newUser,
        newOwner
        }
        )
    } catch (error) {
        console.log(error)
    }
}

const loginUser =async (req,res)=>{
    res.status(200).json("not implemented");
}
const updateUser =async (req,res)=>{
    res.status(200).json("not implemented");
}
const deleteUser =async (req,res)=>{
    res.status(200).json("not implemented");
}
const showUser =async (req,res)=>{
    res.status(200).json("not implemented");
}

export 
{
    registerUser,
}