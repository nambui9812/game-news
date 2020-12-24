import express from 'express';
import jwt from 'jsonwebtoken';

import dotenv from '../configs/dotenv';

const AuthenticateMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        // Get token
        const token = req.header('Authorization').toString();

        if (!token || !token.startsWith('Bearer ')) {
            res.status(401).json({
                message: 'Error: Unauthorized'
            });
        }

        // Verify
        const decoded = jwt.verify(token, dotenv.JWT.SECRET_KEY);

        // Success
        res.locals.jwtData = decoded;

        next();
    }
    catch(err) {
        res.status(401).json({
            message: 'Error: Unauthorized'
        });
    }
};

export default AuthenticateMiddleware;
