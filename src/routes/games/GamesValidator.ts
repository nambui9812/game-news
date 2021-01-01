import express from 'express';
import validator from 'validator';
import sanitizeHtml from 'sanitize-html';

import { ROLES } from '../../configs/contants';

const createGameValidator = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { role } = res.locals.jwtData as { id: string, username: string, role: number };
    const { name, description, genres, tags } = req.body as { name: string, description: string, genres: string[], tags: string[] };

    try {
        // Only Manager and Admin can do this
        if (role !== ROLES.MANAGER && role !== ROLES.ADMIN) {
            throw new Error('Unauthorized');
        }

        // Check for valid fields
        if (!name || name === '') throw new Error('Name is mandatory');

        if (!validator.isAlphanumeric(name, 'en-US')) throw new Error('Name can only contain letters and numbers');

        if (!description || description === '') throw new Error('Description is mandatory');

        res.locals.data = {
            name,
            description: sanitizeHtml(description),                             // Clean
            genres: genres ? genres.map(genre => sanitizeHtml(genre)) : [],     // Clean
            tags: tags ? tags.map(tag => sanitizeHtml(tag)) : []                // Clean
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
    const { role } = res.locals.jwtData as { id: string, username: string, role: number };

    try {
        // Only Manager and Admin can do this
        if (role !== ROLES.MANAGER && role !== ROLES.ADMIN) {
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

const addImagesValidator = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { role } = res.locals.jwtData as { id: string, username: string, role: number };
    const files = req.files;

    try {
        // Only Manager and Admin can do this
        if (role !== ROLES.MANAGER && role !== ROLES.ADMIN) {
            throw new Error('Unauthorized');
        }

        // Check if there is any file
        if (!files || files.length === 0) {
            throw new Error('No images to add');
        }

        next();
    }
    catch(err) {
        res.status(401).json({
            message: 'Error: ' + err.message
        });
    }
};

const removeImagesValidator = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { role } = res.locals.jwtData as { id: string, username: string, role: number };
    const { gameId, imageUrls } = req.body as { gameId: string, imageUrls: string[] }

    try {
        // Only Manager and Admin can do this
        if (role !== ROLES.MANAGER && role !== ROLES.ADMIN) {
            throw new Error('Unauthorized');
        }

        // Check for valid field
        if (!gameId || gameId === '') throw new Error('Game id is mandatory');

        if (!imageUrls || imageUrls.length === 0) throw new Error('No image url to remove');

        imageUrls.forEach(url => {
            if (!validator.isURL(url)) throw new Error('Invalid url');
        })

        res.locals.data = {
            gameId: sanitizeHtml(gameId),                           // Clean
            imageUrls: imageUrls.map(url => sanitizeHtml(url))      // Clean
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
    addImagesValidator,
    removeImagesValidator
};
