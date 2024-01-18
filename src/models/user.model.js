import {Schema,model} from "mongoose";

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    username:{
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
        required: true,
    },
    avatar:{
        type:String
    }
})
const User = model('User', userSchema);

// write refersh token and access token
// pre save for password encryption
// pre save for username,email lowercase
// pre save for fullname uppercase

export {User}