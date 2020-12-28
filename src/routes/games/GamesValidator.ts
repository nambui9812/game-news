import express from 'express';

import { ROLES } from '../../configs/contants';

const createGameValidator = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { id, username, role } = res.locals.jwtData as { id: string, username: string, role: number };
    const { name, description, genres, tags } = req.body as { name: string, description: string, genres: string[], tags: string[] };

    try {
        // Check for valid token fields
        if (
            !id || id === '' ||
            !username || username === '' ||
            !role || Number.isNaN(role)
        ) throw new Error('Invalid token');

        // Only Manager and Admin can do this
        if (role !== ROLES.MANAGER || role !== ROLES.ADMIN) {
            throw new Error('Unauthorized');
        }

        // Check for valid fields
        if (!name || name === '') throw new Error('Name is mandatory');

        if (!description || description === '') throw new Error('Description is mandatory');

        res.locals.data = {
            name,
            description,
            genres: genres ? genres : [],
            tags: tags ? tags : [],
        };

        next();
    }
    catch(err) {
        res.status(404).json({
            message: 'Error: ' + err.message
        });
    }
};

const deleteGameValidator = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { id, username, role } = res.locals.jwtData as { id: string, username: string, role: number };

    try {
        // Check for valid token fields
        if (
            !id || id === '' ||
            !username || username === '' ||
            !role || Number.isNaN(role)
        ) throw new Error('Invalid token');

        // Only Manager and Admin can do this
        if (role !== ROLES.MANAGER || role !== ROLES.ADMIN) {
            throw new Error('Unauthorized');
        }

        next();
    }
    catch(err) {
        res.status(401).json({
            message: 'Error: ' + err.message
        });
    }
};

export {
    createGameValidator,
    deleteGameValidator,
};
