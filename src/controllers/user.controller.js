/**
 * This File Contains User Contorller Which Controls
 * Five Endpoints of User Routes.
*/

/** External Imports ( NPM ) */
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { loggedIn } from '../firebase/firebase.utils.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { setDoc, getDocs, getDoc, updateDoc, deleteDoc, collection, doc } from 'firebase/firestore';

/** Internal Imports */
import User from '../models/User.model.js';
import sendMail from '../mailer/mailer.utils.js';
import constants from '../constants/global.constant.js';
import { firestore, auth } from '../firebase/firebase.utils.js';

/**
 * @desc Adds ( Registers ) New User To Firestore
 * @method POST
 * @route /auth/register
*/
const addUser = async (req, res) => {
    const user = new User({ ...req.body }).getInfo();
    
    if (JSON.stringify(user) === JSON.stringify(constants.INVALID_OBJECT)) {
        return res.status(400).send('Invalid User Info');
    }
    
    try {
        const userDocument = doc(firestore, 'users', user.email);
        const exists = (await getDoc(userDocument)).exists();
        
        if (exists) {
            return res.status(400).send('User With This Email Already Exists!');
        }
        
        const userPassword = randomBytes(5).toString('hex');
        const hashedPassword = await bcrypt.hash(userPassword, 10);

        await createUserWithEmailAndPassword(auth, user.email, userPassword);
        
        await setDoc(userDocument, { ...user, password: hashedPassword });
        sendMail(user.email, userPassword);
        return res.status(200).send('User Added Successfully!, Check Your Email for Password.');
    }
    catch (e) {
        return res.status(500).send(`Error Regestring New User!\n\nErrorMessage: ${e}\n`);
    }
};

/**
 * @desc Retrieves All Users That Exist in Firestore
 * @method GET
 * @route /auth/users
*/
const getAllUsers = async (req, res) => {
    try {
        const usersSnapshots = await getDocs(collection(firestore, 'users'));
        const users = [];
        usersSnapshots.forEach(user => users.push(user.data()));
        return res.status(200).send(users);
    }
    catch (e) {
        return res.status(500).send(`Error Retrieving All Users!\n\nErrorMessage: ${e}\n`);
    }
};

/**
 * @desc Retrieves Single User That Exists in Firestore
 * @method GET
 * @route /auth/users/:mail
*/
const getSingleUser = async (req, res) => {
    try {
        const { mail } = req.params;
        const userDoc = await getDoc(doc(firestore, 'users', mail));
        
        if (!userDoc.exists()) {
            return res.status(404).send('User Not Found!');
        }
        
        return res.status(200).send(userDoc.data());
    }
    catch (e) {
        return res.status(500).send(`Error Retrieving The User!\n\nErrorMessage: ${e}\n`);
    }
};

/**
 * @desc Updates Single User That Exists in Firestore
 * @method PUT
 * @route /auth/users/:mail
*/
const updateUser = async (req, res) => {
    try {
        const { mail } = req.params;
        const userDoc = doc(firestore, 'users', mail);
        const user = await getDoc(userDoc);
        
        if (!user.exists()) {
            return res.status(404).send('User Not Found!');
        }

        const newUser = new User({ ...req.body }).getInfo();
        
        if (JSON.stringify(newUser) === JSON.stringify(constants.INVALID_OBJECT)) {
            return res.status(400).send('Invalid New User Info');
        }

        if (newUser.email !== mail) {
            return res.status(400).send('You Can\'t Update Your Email Address.');
        }
        
        await updateDoc(userDoc, newUser);
        return res.status(200).send('User Updated Successfully!');
    }
    catch (e) {
        return res.status(500).send(`Error Updating The User!\n\nErrorMessage: ${e}\n`);
    }
};

/**
 * @desc Deletes Single User That Exists in Firestore
 * @method DELETE
 * @route /auth/users/:mail
*/
const deleteUser = async (req, res) => {
    try {
        const { mail } = req.params;
        const userDoc = doc(firestore, 'users', mail);
        const user = await getDoc(userDoc);
        
        if (!user.exists()) {
            return res.status(404).send('User Not Found!');
        }

        await deleteDoc(userDoc);
        return res.status(200).send('User Deleted Successfully!');
    }
    catch (e) {
        return res.status(500).send(`Error Deleting The User!\n\nErrorMessage: ${e}\n`);
    }
};

/**
 * @desc Signs Single User Into The Service
 * @method POST
 * @route /auth/users/signin
*/
const signUserIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userDoc = await getDoc(doc(firestore, 'users', email));

        if (!userDoc.exists()) {
            return res.status(404).send('User Not Found!, Please Sign Up First.');
        }

        if (loggedIn) {
            return res.status(400).send('A User is Already Signed In, Sign Out First Please.');
        }

        const userCredentials = await signInWithEmailAndPassword(auth, email, password);

        return res.status(200).send(`User Logged In Successfully!\nuser: ${userCredentials.user.email}`);
    }
    catch (e) {
        return res.status(500).send(`Error Logging In!\n\n${e}\n`);
    }
};

/**
 * @desc Signs Single User Out of The Service
 * @method POST
 * @route /auth/users/signout
*/
const signUserOut = async (req, res) => {
    if (!loggedIn) {
        return res.status(400).send('You Are Already Signed Out.');
    }
    
    try {
        await signOut(auth);
        return res.status(200).send('Signed Out Successfully!');
    }
    catch (e) {
        return res.status(500).send(`Error Signing User Out!\n\n${e}\n`);
    }
};

const userController = {
    addUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    signUserIn,
    signUserOut
};

export default userController;
