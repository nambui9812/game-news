import express from 'express';

import UserService from '../../services/User/UserService';

const userService = UserService();

const getAllUsersController = async (req: express.Request, res: express.Response) => {
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
};

const getUserByIdController = async (req: express.Request, res: express.Response) => {
    try {
        const userId: string = req.params.userId;

        const user = await userService.getUserById(userId);

        res.status(200).json({
            message: 'Get user successfully.',
            data: user
        });
    }
    catch(err) {
        res.status(404).json({
            message: `Error: ${err.message}`
        });
    }
};

const createNewUserController = async (req: express.Request, res: express.Response) => {
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
};

const deleteUserController = async (req: express.Request, res: express.Response) => {
    try {
        const { id, role } = res.locals.jwtData as { id: string, role: number };
        const userId: string = req.params.userId;

        await userService.deleteUserById(userId, id, role);

        res.status(200).json({
            message: 'Delete user successfully.'
        });
    }
    catch(err) {
        res.status(404).json({
            message: `Error: ${err.message}`
        });
    }
};

const changePasswordController = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = res.locals.jwtData as { id: string };
        const { oldPassword, newPassword } = req.body as { oldPassword: string, newPassword: string };

        const updatedUser = await userService.changePassword({ id, oldPassword, newPassword });

        res.status(200).json({
            message: 'Change password successfully.',
            data: updatedUser
        });
    }
    catch(err) {
        res.status(404).json({
            message: `Error: ${err.message}`
        });
    }
};

const loginController = async (req: express.Request, res: express.Response) => {
    try {
        const { username, password } = req.body as { username: string, password: string };

        const data = await userService.authenticate({ username, password });

        res.status(200).json({
            message: 'Update user successfully.',
            data
        });
    }
    catch(err) {
        res.status(404).json({
            message: `Error: ${err.message}`
        });
    }
};

const changeRoleController = async (req: express.Request, res: express.Response) => {
    try {
        const { role } = res.locals.jwtData as { role: number };
        const { userId, newUserRole } = req.body as { userId: string, newUserRole: number };

        const updatedUser = await userService.changeRole({ role, userId, newUserRole });

        res.status(200).json({
            message: 'Change role successfully.',
            data: updatedUser
        });
    }
    catch(err) {
        res.status(404).json({
            message: `Error: ${err.message}`
        });
    }
};

const changeAvatarController = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = res.locals.jwtData as { id: string };
        const file = req.file;

        const updatedUser = await userService.changeAvatar({ id, file });

        res.status(200).json({
            message: 'Change avatar successfully.',
            data: updatedUser
        });
    }
    catch(err) {
        res.status(404).json({
            message: `Error: ${err.message}`
        });
    }
};

export {
    getAllUsersController,
    getUserByIdController,
    createNewUserController,
    deleteUserController,
    changePasswordController,
    loginController,
    changeRoleController,
    changeAvatarController
};
