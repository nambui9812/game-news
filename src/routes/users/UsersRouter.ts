import express from 'express';

import AuthenticateMiddleware from '../../middlewares/AuthenticateMiddleware';

import {
    getAllUsersValidator,
    getUserByIdValidator,
    createUserValidator,
    deleteUserValidator,
    changePasswordValidator,
    loginValidator,
    changeRoleValidator
} from './UsersValidator';

import {
    getAllUsersController,
    getUserByIdController,
    createNewUserController,
    deleteUserController,
    changePasswordController,
    loginController,
    changeRoleController
} from './UsersController';

const baseURL = '/api/v1/users'
const router = express.Router();

// Get all users
router.get(baseURL + '/', AuthenticateMiddleware, getAllUsersValidator, getAllUsersController);

// Get user by id
router.get(baseURL + '/user/:userId', AuthenticateMiddleware, getUserByIdValidator, getUserByIdController);

// Create new user
router.post(baseURL + '/register', createUserValidator, createNewUserController);

// Delete user
router.delete(baseURL + '/delete/:userId', AuthenticateMiddleware, deleteUserValidator, deleteUserController);

// Change password
router.put(baseURL + '/change-password', AuthenticateMiddleware, changePasswordValidator, changePasswordController);

// Authentication
router.post(baseURL + '/login', loginValidator, loginController);

// Change role
router.put(baseURL + '/change-role', AuthenticateMiddleware, changeRoleValidator, changeRoleController);

export default router;
