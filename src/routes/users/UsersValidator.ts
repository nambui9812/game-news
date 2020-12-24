import express from 'express';

import { ROLES } from '../../configs/contants';

const getAllUsersValidator = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { id, username, role } = res.locals.jwtData as { id: string, username: string, role: number };

    try {
        // Check for valid token fields
        if (
            !id || id === '' ||
            !username || username === '' ||
            !role || Number.isNaN(role)
        ) throw new Error('Invalid token');

        // Only admin can do this
        if (role !== ROLES.ADMIN) throw new Error('Unauthorized');

        next();
    }
    catch(err) {
        res.status(401).json({
            message: 'Error: ' + err.message
        });
    }
};

const getUserByIdValidator = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { id, username, role } = res.locals.jwtData as { id: string, username: string, role: number };
    const userId: string = req.params.id;

    try {
        // Check for valid token fields
        if (
            !id || id === '' ||
            !username || username === '' ||
            !role || Number.isNaN(role)
        ) throw new Error('Invalid token');

        // Admin can do this
        if (role === ROLES.ADMIN) {
            next();
            return;
        }

        // Otherwise, only owner can do this
        if (!userId || userId === '') throw new Error('User id is mandatory');
        if (id !== userId) throw new Error('Unauthorized');

        next();
    }
    catch(err) {
        res.status(401).json({
            message: 'Error: ' + err.message
        });
    }
};

const createUserValidator = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { email, username, password } = req.body as { email: string, username: string, password: string };

    try {
        // Check for valid fields
        if (!email || email === '') throw new Error('Email is mandatory');

        if (!username || username === '') throw new Error('Username is mandatory');

        if (!password || password === '') throw new Error('Password is mandatory');

        next();
    }
    catch(err) {
        res.status(404).json({
            message: 'Error: ' + err.message
        });
    }
};

const deleteUserValidator = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { id, username, role } = res.locals.jwtData as { id: string, username: string, role: number };
    const userId: string = req.params.id;

    try {
        // Check for valid token fields
        if (
            !id || id === '' ||
            !username || username === '' ||
            !role || Number.isNaN(role)
        ) throw new Error('Invalid token');

        // Admin can do this
        if (role === ROLES.ADMIN) {
            next();
            return;
        }

        // Otherwise, only owner can do this
        if (!userId || userId === '') throw new Error('User id is mandatory');
        if (id !== userId) throw new Error('Unauthorized');

        next();
    }
    catch(err) {
        res.status(401).json({
            message: 'Error: ' + err.message
        });
    }
};

const changePasswordValidator = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { id, username, role } = res.locals.jwtData as { id: string, username: string, role: number };
    const { oldPassword, newPassword, confirmNewPassword } = req.body as { oldPassword: string, newPassword: string, confirmNewPassword };

    try {
        // Check for valid token fields
        if (
            !id || id === '' ||
            !username || username === '' ||
            !role || Number.isNaN(role)
        ) throw new Error('Invalid token');

        // Check for valid fields
        if (!oldPassword || oldPassword === '') throw new Error('Old password is mandatory');

        if (!newPassword || newPassword === '') throw new Error('New password is mandatory');

        if (!confirmNewPassword || confirmNewPassword === '') throw new Error('Confirm new password is mandatory');

        if (newPassword !== confirmNewPassword) throw new Error('New Password and confirm new password are not matched');

        next();
    }
    catch(err) {
        res.status(404).json({
            message: 'Error: ' + err.message
        });
    }
};

const loginValidator = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { username, password } = req.body as { username: string, password: string };

    try {
        // Check for valid fields
        if (!username || username === '') throw new Error('Username is mandatory');

        if (!password || password === '') throw new Error('Password is mandatory');

        next();
    }
    catch(err) {
        res.status(404).json({
            message: 'Error: ' + err.message
        });
    }
};

export {
    getAllUsersValidator,
    getUserByIdValidator,
    createUserValidator,
    deleteUserValidator,
    changePasswordValidator,
    loginValidator
};
