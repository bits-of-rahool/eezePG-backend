import {Schema,model} from "mongoose";

const bookmarkSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,ref:"User",
        required:true
    },
    property:{
        type: Schema.Types.ObjectId,ref:"Listing",
        required:true
    },
})
const Bookmark = model('Bookmark', bookmarkSchema);

// write refersh token and access token
// pre save for password encryption
// pre save for username,email lowercase
// pre save for fullname uppercase

export {Bookmark}