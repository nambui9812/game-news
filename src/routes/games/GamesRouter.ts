import express from 'express';

import AuthenticateMiddleware from '../../middlewares/AuthenticateMiddleware';
import { multipleUpload } from '../../middlewares/UploadMiddleware';

import {
    createGameValidator,
    deleteGameValidator
} from './GamesValidator';

import {
    getAllGamesController,
    getGameByIdController,
    createNewGameController,
    deleteGameController
} from './GamesController';

const baseURL = '/api/v1/games'
const router = express.Router();

// Get all games
router.get(baseURL + '/', getAllGamesController);

// Get game by id
router.get(baseURL + '/game/:gameId', getGameByIdController);

// Create new game
router.post(baseURL + '/', AuthenticateMiddleware, multipleUpload, createGameValidator, createNewGameController);

// Delete game
router.delete(baseURL + '/delete/:gameId', AuthenticateMiddleware, deleteGameValidator, deleteGameController);

export default router;
