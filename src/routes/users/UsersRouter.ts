import express from 'express';

import { CreateUserValidator, ChangePasswordValidator } from './UsersValidator';
import UserService from '../../services/User/UserService';

const baseURL = '/api/v1/users'
const router = express.Router();
const userService = UserService();

// Get all users
router.get(baseURL + '/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();

        res.status(200).json({
            message: 'Get all users successfully.',
            data: users
        });
    }
    catch(err) {
        res.status(404).json({
            message: `Error: ${err.message}`
        });
    }
});

// Get user by id
router.get(baseURL + '/:id', async (req, res) => {
    try {
        const id: string = req.params.id;

        const user = await userService.getUserById(id);

        res.status(202).json({
            message: 'Get user successfully.',
            data: user
        });
    }
    catch(err) {
        res.status(404).json({
            message: `Error: ${err.message}`
        });
    }
});

// Create new user
router.post(baseURL + '/', CreateUserValidator, async (req, res) => {
    try {
        const { email, username, password } = req.body as { email: string, username: string, password: string };

        const newUser = await userService.createUser({ email, username, password });

        res.status(201).json({
            message: 'Create new user successfully.',
            data: newUser
        });
    }
    catch(err) {
        res.status(404).json({
            message: `Error: ${err.message}`
        });
    }
});

// Change password
router.put(baseURL + '/', ChangePasswordValidator, async (req, res) => {
    try {
        const { id, oldPassword, newPassword } = req.body as { id: string, oldPassword: string, newPassword: string };

        const newUser = await userService.changePassword({ id, oldPassword, newPassword });

        res.status(201).json({
            message: 'Update user successfully.',
            data: newUser
        });
    }
    catch(err) {
        res.status(404).json({
            message: `Error: ${err.message}`
        });
    }
});

// Delete user
router.delete(baseURL + '/:id', async (req, res) => {
    try {
        const id: string = req.params.id;

        await userService.deleteUserById(id);

        res.status(202).json({
            message: 'Delete user successfully.'
        });
    }
    catch(err) {
        res.status(404).json({
            message: `Error: ${err.message}`
        });
    }
});

export default router;
