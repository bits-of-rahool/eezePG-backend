import Joi from "joi";

const listingValidation = Joi.object({
    name:Joi.string().required(),
    description:Joi.string().required(),
    propertyOwner:Joi.string().required(),
    listingType:Joi.string().required(),
    location:Joi.string().required(),
    address:Joi.string().required(),
    rent:Joi.string().required(),
    contract:Joi.string().allow(" ",null),
    availability:Joi.string(),
    amenities:Joi.string().required()
})

export {listingValidation}
//photos wont come in req.body