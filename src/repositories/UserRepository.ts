import { getMongoRepository } from 'typeorm';

import User from '../models/User';

const UserRepository = () => {
    const getAllUsers = () => {
        const userRepository = getMongoRepository(User);
        return userRepository.find();
    };

    const getUserById = (id: string) => {
        const userRepository = getMongoRepository(User);
        return userRepository.findOne(id);
    }

    const getUserByUsername = (username: string) => {
        const userRepository = getMongoRepository(User);
        return userRepository.findOne({ username });
    }
    
    const createUser = (newUser: User) => {
        const userRepository = getMongoRepository(User);
        return userRepository.save(newUser);
    };

    const updateUser = (updatedUser: User) => {
        const userRepository = getMongoRepository(User);
        return userRepository.save(updatedUser);
    }
    
    const deleteUser = (user: User) => {
        const userRepository = getMongoRepository(User);
        return userRepository.remove(user);
    };

    return Object.freeze({
        getAllUsers,
        getUserById,
        getUserByUsername,
        updateUser,
        createUser,
        deleteUser
    });
};

export default UserRepository;
