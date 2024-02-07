import {Schema,model} from "mongoose";

const ownerSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,ref:"User"
    },
    properties:[{type:Schema.Types.ObjectId ,ref:"Listing"}],
})
const Owner = model('Owner', ownerSchema);

// write refersh token and access token
// pre save for password encryption
// pre save for username,email lowercase
// pre save for fullname uppercase

export {Owner}