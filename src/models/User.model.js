/**
 * This File Contains User Model (a.k.a) User Schema
 * Which is Responsible for Representing a User and
 * Validating it's info.
*/

/** Internal Imports */
import { validateUser } from '../validation/user.validation.js';
import constants from '../constants/global.constant.js'

/** User Class */ export default class User {
    constructor(user) {
        this.user = user;
    }

    /**
     * Validates The User Info To Figure Out Whether
     * It Fits Validation Schema Or Doesn't.
     * @returns Boolean
     */
    validate() {
        return validateUser(this.user).error ? false : true;
    }

    /**
     * This Method Utilizes `validate` Method To
     * Return Suitable Object Depending on it.
     * @returns Object
     */
    getInfo() {
        return this.validate() ? this.user : constants.INVALID_OBJECT;
    }
};
