import {User} from '../models/user.model.js';

const registerUser = async (req, res) => {
    console.log(req.body.fullname)
    console.log(req.body.username)
    console.log(req.body.email)

    res.status(200).json({
    message:"user registered successfully"
    }
    )
}

const loginUser = async(req,res)=>{}

export 
{
    registerUser,
    loginUser,
}