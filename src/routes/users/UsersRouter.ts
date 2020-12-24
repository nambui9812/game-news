import express from 'express';

import AuthenticateMiddleware from '../../middlewares/AuthenticateMiddleware';

import {
    getAllUsersValidator,
    getUserByIdValidator,
    createUserValidator,
    deleteUserValidator,
    changePasswordValidator,
    loginValidator
} from './UsersValidator';

import {
    getAllUsersController,
    getUserByIdController,
    createNewUserController,
    deleteUserController,
    changePasswordController,
    login
} from './UsersController';

const baseURL = '/api/v1/users'
const router = express.Router();

// Get all users
router.get(baseURL + '/', AuthenticateMiddleware, getAllUsersValidator, getAllUsersController);

// Get user by id
router.get(baseURL + '/user/:id', AuthenticateMiddleware, getUserByIdValidator, getUserByIdController);

// Create new user
router.post(baseURL + '/register', createUserValidator, createNewUserController);

// Delete user
router.delete(baseURL + '/delete/:id', AuthenticateMiddleware, deleteUserValidator, deleteUserController);

// Change password
router.put(baseURL + '/change-password', AuthenticateMiddleware, changePasswordValidator, changePasswordController);

// Authentication
router.post(baseURL + '/login', loginValidator, login);

export default router;
