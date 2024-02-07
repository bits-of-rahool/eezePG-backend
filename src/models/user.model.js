import {Schema,model} from "mongoose";

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
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum:['student', 'owner'],
        required:true
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
const User = model('User', userSchema);

// write refersh token and access token
// pre save for password encryption
// pre save for username,email lowercase
// pre save for fullname uppercase

export {User}