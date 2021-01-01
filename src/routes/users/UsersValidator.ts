import express from 'express';
import validator from 'validator';
import sanitizeHtml from 'sanitize-html';

import { ROLES } from '../../configs/contants';

const getAllUsersValidator = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { role } = res.locals.jwtData as { id: string, username: string, role: number };

    try {
        // Only manager or admin can do this
        if (role !== ROLES.MANAGER && role !== ROLES.ADMIN) throw new Error('Unauthorized');
        
        next();
    }
    catch(err) {
        res.status(401).json({
            message: 'Error: ' + err.message
        });
    }
};

const getUserByIdValidator = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { id, role } = res.locals.jwtData as { id: string, username: string, role: number };
    const userId: string = req.params.userId;

    try {
        // Manager and Admin can do this
        if (role === ROLES.MANAGER || role === ROLES.ADMIN) {
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

        if (!validator.isEmail(email)) throw new Error('Invalid email');

        if (!username || username === '') throw new Error('Username is mandatory');

        if (!validator.isAlphanumeric(username, 'en-US')) throw new Error('Username can only contain letters and numbers');

        if (!password || password === '') throw new Error('Password is mandatory');

        if (!validator.isStrongPassword(password))
            throw new Error('Password must contain at least 1 lower case, 1 upper case, 1 number, 1 symbol and 8 in length');

        res.locals.data = {
            email: sanitizeHtml(email),         // Clean
            username: sanitizeHtml(username),   // Clean
            password: sanitizeHtml(password)    // Clean
        };

        next();
    }
    catch(err) {
        res.status(404).json({
            message: 'Error: ' + err.message
        });
    }
};

const deleteUserValidator = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { id, role } = res.locals.jwtData as { id: string, username: string, role: number };
    const userId: string = req.params.userId;

    try {
        // Manager and Admin can do this
        if (role === ROLES.MANAGER || role === ROLES.ADMIN) {
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
    const { oldPassword, newPassword, confirmNewPassword } = req.body as { oldPassword: string, newPassword: string, confirmNewPassword: string };

    try {
        // Check for valid fields
        if (!oldPassword || oldPassword === '') throw new Error('Old password is mandatory');

        if (!newPassword || newPassword === '') throw new Error('New password is mandatory');

        if (!confirmNewPassword || confirmNewPassword === '') throw new Error('Confirm new password is mandatory');

        if (newPassword !== confirmNewPassword) throw new Error('New Password and confirm new password are not matched');

        if (!validator.isStrongPassword(newPassword))
            throw new Error('Password must contain at least 1 lower case, 1 upper case, 1 number, 1 symbol and 8 in length');

        res.locals.data = {
            oldPassword: sanitizeHtml(oldPassword),                 // Clean
            newPassword: sanitizeHtml(newPassword),                 // Clean
            confirmNewPassword: sanitizeHtml(confirmNewPassword)    // Clean
        };

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

        res.locals.data = {
            username: sanitizeHtml(username),       // Clean
            password: sanitizeHtml(password)        // Clean
        };

        next();
    }
    catch(err) {
        res.status(404).json({
            message: 'Error: ' + err.message
        });
    }
};

const changeRoleValidator = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { role } = res.locals.jwtData as { id: string, username: string, role: number };
    const { userId, newUserRole } = req.body as { userId: string, newUserRole: number };

    try {
        // Check for valid fields
        if (!userId || userId === '') throw new Error('User id is mandatory');

        if (!newUserRole || Number.isNaN(newUserRole)) throw new Error('New user role is mandatory');

        // Only Manager and Admin can change role
        if (role !== ROLES.MANAGER && role !== ROLES.ADMIN) throw new Error('Unauthorized');

        res.locals.data = {
            userId: sanitizeHtml(userId),   // Clean
            newUserRole
        };

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
    loginValidator,
    changeRoleValidator
};
