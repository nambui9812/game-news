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

// TODO: Comment after creating one manager
// import UserRepository from '../../repositories/UserRepository';
// import User from '../../models/User';
// import bcrypt from 'bcrypt';

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

// Create manager
// TODO: Comment after creating one manager
// router.post(baseURL + '/manager/create', async (req, res) => {
//     const userRepository = UserRepository();
//     const { email, username, password } = req.body as { email: string, username: string, password: string }

//     try {
//         // Gen salt
//         const salt = await bcrypt.genSalt(10);

//         // Hash
//         const hashed = await bcrypt.hash(password, salt);

//         // Create manager
//         const manager = new User();
//         manager.email = email;
//         manager.username = username;
//         manager.password = hashed;
//         manager.role = 0;

//         const createdManager = await userRepository.createUser(manager);

//         res.status(201).json({
//             message: 'Create manager successfully',
//             data: createdManager
//         })
//     }
//     catch(err) {
//         res.status(404).json({ message: 'Error when creating manager' });
//     }
// })

export default router;
