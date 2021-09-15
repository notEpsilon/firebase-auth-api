/**
 * This File Contains User Validation Schema
 * And Validation Helper Functions.
*/

/** External Imports ( NPM ) */
import Joi from 'joi';

/** User Validation Schema */
const userSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }).required(),
    number: Joi.string().pattern(new RegExp('^[0-9]{7,15}$')).required(),
    name: Joi.string().pattern(new RegExp('^[a-zA-Z]+[\\s\\w]+')).min(3).max(15).required(),
    gender: Joi.string().pattern(new RegExp('^(male|female)$')).required(),
    language: Joi.string().pattern(new RegExp('^[a-zA-Z]+$')).min(2).max(15).required(),
    avatarUrl: Joi.string().pattern(new RegExp('^(http://|https://|www.)')).required()
});

export const validateUser = user => userSchema.validate(user);

export default userSchema;
