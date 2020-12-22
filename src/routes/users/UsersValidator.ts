import express from 'express';

const CreateUserValidator = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { email, username, password } = req.body as { email: string, username: string, password: string };

    try {
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

const ChangePasswordValidator = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { id, oldPassword, newPassword, confirmNewPassword } = req.body as { id: string, oldPassword: string, newPassword: string, confirmNewPassword };

    try {
        if (!id || id === '') throw new Error('Id is mandatory');

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

export {
    CreateUserValidator,
    ChangePasswordValidator
};
