import {Schema,model} from "mongoose";

const studentSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,ref:"User"
    },
    
})
const Student = model('Student', studentSchema);

export {Student}