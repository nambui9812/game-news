import { getMongoRepository } from 'typeorm';

import Game from '../models/Game';

const GameRepository = () => {
    const getAllGames = () => {
        const gameRepository = getMongoRepository(Game);
        return gameRepository.find();
    };

    const getGameById = (id: string) => {
        const gameRepository = getMongoRepository(Game);
        return gameRepository.findOne(id);
    }
    
    const createGame = (newGame: Game) => {
        const gameRepository = getMongoRepository(Game);
        return gameRepository.save(newGame);
    };

    const updateGame = (updatedGame: Game) => {
        const gameRepository = getMongoRepository(Game);
        return gameRepository.save(updatedGame);
    }
    
    const deleteGame = (game: Game) => {
        const gameRepository = getMongoRepository(Game);
        return gameRepository.remove(game);
    };

    return Object.freeze({
        getAllGames,
        getGameById,
        createGame,
        updateGame,
        deleteGame
    });
};

export default GameRepository;
