import GameRepository from '../../repositories/GameRepository';
import { CreateGameInterface } from './GameInterfaces';
import Game from '../../models/Game';

const GameService = () => {
    const gameRepository = GameRepository();

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

    const createGame = async ({ name, description, genres, tags }: CreateGameInterface) =>{
        try {
            // Make game
            const newGame = new Game();
            newGame.name = name;
            newGame.description = description;
            newGame.genres = genres;
            newGame.tags = tags;
            newGame.rating = [];

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
