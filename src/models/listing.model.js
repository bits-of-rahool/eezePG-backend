import {Schema,model, mongo} from "mongoose";

const listingSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    propertyOwner:{
        type:Schema.Types.ObjectId,
        ref:"Owner",
        required:true
    },
    listingType:{
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
    address:{
        type:String,
        required:true
    },
    rent:{
        type:Number,
        required:true
    },
    contract:{
        type:String,
        required:true
    }, 

    availability:{
        type:Date
    },

    amenities: [{
        type:String,
        required:true
    }],
    photos: {
        type: [String],
        required: true
    }

    //eeze verified??
})

const amenitiesSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true, 
    },
    description:String,
    icon:String 
})

function isLatitude(lat) {
    return -90 <= lat && lat <= 90;
}

function isLongitude(lng) {
return -180 <= lng && lng <= 180;
}

const Listing = model('Listing', listingSchema);
const Amenities = model('Amenities', amenitiesSchema);

Listing.schema.index({ location: '2dsphere' });

export {Listing,Amenities}