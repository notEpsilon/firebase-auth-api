/**
 * This File Contains User Router API Endpoints
 * And Specifies Controller Method To Each One.
*/

/** External Imports ( NPM ) */
import express from 'express';

/** Internal Imports */
import userController from '../controllers/user.controller.js';

const userRouter = express.Router();

/** Add User */
userRouter.post('/register', userController.addUser);

/** Get All Users */
userRouter.get('/users', userController.getAllUsers);

/** Get Single User */
userRouter.get('/users/:mail', userController.getSingleUser);

/** Update User */
userRouter.put('/users/:mail', userController.updateUser);

/** Delete User */
userRouter.delete('/users/:mail', userController.deleteUser);

export default userRouter;
