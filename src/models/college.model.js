import {Schema,model} from "mongoose";

const collegeSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    location:{
        type:{
            type:String,
            enum:['Point'],
            required:true
        },
        coordinates:{
            type:[Number],
            required:true,
            validate:  [
                {
                    validator: function (val) {
                        return isLongitude(val[0]) && isLatitude(val[1]);
                    },
                    message: 'Invalid coordinates.',
                },
            ]
        }
    },
})

function isLatitude(lat) {
    return -90 <= lat && lat <= 90;
}

function isLongitude(lng) {
return -180 <= lng && lng <= 180;
}

const College = model('College', collegeSchema);
College.schema.index({ location: '2dsphere' });

// write refersh token and access token
// pre save for password encryption
// pre save for username,email lowercase
// pre save for fullname uppercase

export {College}