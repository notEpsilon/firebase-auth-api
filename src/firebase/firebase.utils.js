/**
 * This File is Responsible For Configuring Firebase App
 * And Firestore DB & Exporting Them To The Outer Files.
*/

/** External Imports ( NPM ) */
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/** Internal Imports */
import constants from '../constants/global.constant.js';

const fireApp = initializeApp(constants.FIREBASE_CONFIG);
const firestore = getFirestore(fireApp);

export {
    firestore
};

export default fireApp;