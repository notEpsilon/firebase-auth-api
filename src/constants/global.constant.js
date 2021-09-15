/**
 * This File Contains Global Constants That
 * is Important to Use Through Our Project.
*/

/** External Imports ( NPM ) */
import dotenv from 'dotenv';
dotenv.config(); /** Environment Variables Configuration */

export default {
    /**
     * INVALID_OBJECT Represents Invalid Data
     * which are represented as objects.
    */
    INVALID_OBJECT: { msg: 'Invalid Object', code: -1 },

    /**
     * FIREBASE_CONFIG Represents Firebase
     * Configuration Info That Allows For
     * Firebase Project Access.
    */
    FIREBASE_CONFIG: {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
        measurementId: process.env.MEASUREMENT_ID
    }
};
