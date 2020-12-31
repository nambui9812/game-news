import express from 'express';

import GameService from '../../services/Game/GameService';

const gameService = GameService();

const getAllGamesController = async (req: express.Request, res: express.Response) => {
    try {
        const games = await gameService.getAllGames();

        res.status(200).json({
            message: 'Get all games successfully.',
            data: games
        });
    }
    catch(err) {
        res.status(404).json({
            message: `Error: ${err.message}`
        });
    }
};

const getGameByIdController = async (req: express.Request, res: express.Response) => {
    try {
        const gameId: string = req.params.gameId;

        const game = await gameService.getGameById(gameId);

        res.status(200).json({
            message: 'Get game successfully.',
            data: game
        });
    }
    catch(err) {
        res.status(404).json({
            message: `Error: ${err.message}`
        });
    }
};

const createNewGameController = async (req: express.Request, res: express.Response) => {
    try {
        const { name, description } = req.body as { name: string, description: string };
        const { genres, tags } = res.locals.data as { genres: string[], tags: string[] };
        const files = req.files ? req.files : [];
        
        const newGame = await gameService.createGame({ name, description, genres, tags, files });

        res.status(201).json({
            message: 'Create new game successfully.',
            data: newGame
        });
    }
    catch(err) {
        res.status(404).json({
            message: `Error: ${err.message}`
        });
    }
};

const deleteGameController = async (req: express.Request, res: express.Response) => {
    try {
        const gameId: string = req.params.gameId;

        await gameService.deleteGameById(gameId);

        res.status(200).json({
            message: 'Delete game successfully.'
        });
    }
    catch(err) {
        res.status(404).json({
            message: `Error: ${err.message}`
        });
    }
};

const addImagesController = async (req: express.Request, res: express.Response) => {
    try {
        const gameId: string = req.params.gameId;
        const files = req.files;

        const updatedGame = await gameService.addImages({ gameId, files });

        res.status(200).json({
            message: 'Add images to game successfully.',
            data: updatedGame
        });
    }
    catch(err) {
        res.status(404).json({
            message: `Error: ${err.message}`
        });
    }
};

const removeImagesController = async (req: express.Request, res: express.Response) => {
    try {
        const { gameId, imageUrls } = req.body as { gameId: string, imageUrls: string[] };

        const updatedGame = await gameService.RemoveImages({ gameId, imageUrls });

        res.status(200).json({
            message: 'Remove images from game successfully.',
            data: updatedGame
        });
    }
    catch(err) {
        res.status(404).json({
            message: `Error: ${err.message}`
        });
    }
};

export {
    getAllGamesController,
    getGameByIdController,
    createNewGameController,
    deleteGameController,
    addImagesController,
    removeImagesController
};
