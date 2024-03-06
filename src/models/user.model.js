import {Schema,model} from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
    },
    role:{
        type: String,
        enum:['newUser','student', 'owner'],
        default:"newUser"
    },
    idProof: {
        type: String,
    },
    verified:{
        type:Boolean,
        default:false
    },
    avatar:{
        type:String
    },
})

// pre save for password encryption
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = model('User', userSchema);

export {User}