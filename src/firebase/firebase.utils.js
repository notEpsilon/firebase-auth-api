/**
 * This File is Responsible For Configuring Firebase App
 * And Firestore DB & Exporting Them To The Outer Files.
*/

/** External Imports ( NPM ) */
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

/** Internal Imports */
import constants from '../constants/global.constant.js';

const fireApp = initializeApp(constants.FIREBASE_CONFIG);
const firestore = getFirestore(fireApp);
const auth = getAuth(fireApp);

let loggedIn = false; /** User Authentication State */

/** User Authentication State Handler */
onAuthStateChanged(auth, user => {
    if (user) {
        loggedIn = true;
    }
    else {
        loggedIn = false;
    }
}, err => {
    console.error(`Error Occured: ${err}`);
});

export {
    firestore,
    auth,
    loggedIn
};

export default fireApp;
