import { getMongoRepository } from 'typeorm';

import User from '../models/User';

const UserRepository = () => {
    const getAllUsers = async () => {
        const userRepository = getMongoRepository(User);
        return userRepository.find();
    };

    const getUserById = async (id: string) => {
        const userRepository = getMongoRepository(User);
        return userRepository.findOne(id);
    }
    
    const createUser = (newUser: User) => {
        const userRepository = getMongoRepository(User);
        return userRepository.save(newUser);
    };

    const updateUser = (updatedUser: User) => {
        const userRepository = getMongoRepository(User);
        return userRepository.save(updatedUser);
    }
    
    const deleteUser = async (user: User) => {
        const userRepository = getMongoRepository(User);
        return userRepository.remove(user);
    };

    return Object.freeze({
        getAllUsers,
        getUserById,
        updateUser,
        createUser,
        deleteUser
    });
};

export default UserRepository;
