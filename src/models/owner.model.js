import {Schema,model} from "mongoose";

const ownerSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,ref:"User"
    },
    properties:[{type:Schema.Types.ObjectId ,ref:"Listing"}],
})
const Owner = model('Owner', ownerSchema);

export {Owner}