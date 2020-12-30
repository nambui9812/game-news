import { v4 } from 'uuid';
import AWS from 'aws-sdk';

import GameRepository from '../../repositories/GameRepository';
import { CreateGameInterface } from './GameInterfaces';
import Game from '../../models/Game';
import dotenv from '../../configs/dotenv';

const GameService = () => {
    const gameRepository = GameRepository();

    // AWS
    const s3 = new AWS.S3({
        credentials: new AWS.Credentials({ accessKeyId: dotenv.AWS.ID, secretAccessKey: dotenv.AWS.SECRET })
    });

    const getAllGames = async () => {
        // Get all
        let games = await gameRepository.getAllGames();

        return games;
    };

    const getGameById = async (id: string) => {
        // Get
        const foundGame = await gameRepository.getGameById(id);

        // Check if exist
        if (!foundGame) throw new Error('Game not found');

        return foundGame;
    };

    const createGame = async ({ name, description, genres, tags, files }: CreateGameInterface) =>{
        try {
            let response;

            if (files.length > 0) {
                // Make params
                const params = [];

                for (let i = 0; i < files.length; ++i) {
                    const file = files[i];
                    const fileArray = file.originalname.split('.');
                    const fileExtension = fileArray[fileArray.length - 1];
                    const fileRandomName = v4();

                    params.push({
                        Bucket: dotenv.AWS.BUCKET_NAME,
                        Key: `${fileRandomName}.${fileExtension}`,
                        Body: files[i].buffer
                    })
                }

                response = await Promise.all(
                    params.map(param => s3.upload(param).promise())
                )
            }

            // Make game
            const newGame = new Game();
            newGame.name = name;
            newGame.description = description;
            newGame.genres = genres;
            newGame.tags = tags;
            newGame.rating = [];
            newGame.imageUrls = response ? response.map(r => r.Location) : [];

            // Save
            const savedGame = await gameRepository.createGame(newGame);

            return savedGame;
        }
        catch(err) {
            throw new Error(err);
        }      
    };

    const deleteGameById = async (gameId: string) => {
        // Get
        const foundGame = await gameRepository.getGameById(gameId);

        // Check if exist
        if (!foundGame) throw new Error('Game not found');

        // Delete
        await gameRepository.deleteGame(foundGame);
    };

    return Object.freeze({
        getAllGames,
        getGameById,
        createGame,
        deleteGameById
    });
};

export default GameService;
