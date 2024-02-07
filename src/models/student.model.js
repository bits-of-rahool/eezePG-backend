import {Schema,model} from "mongoose";

const studentSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,ref:"User"
    },
    
})
const Student = model('Student', studentSchema);

// write refersh token and access token
// pre save for password encryption
// pre save for username,email lowercase
// pre save for fullname uppercase

export {Student}