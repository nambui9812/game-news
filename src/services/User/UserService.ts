import bcrypt from 'bcrypt';

import UserRepository from '../../repositories/UserRepository';
import { ROLES } from '../../configs/contants';
import { CreateUserInterface, ChangePasswordInterface } from './UserInterfaces';
import User from '../../models/User';

const UserService = () => {
    const userRepository = UserRepository();

    const getAllUsers = async () => {
        // Get all
        let users = await userRepository.getAllUsers();

        // Remove password
        users = users.map(user => {
            user.password = undefined;

            return user;
        });

        return users;
    };

    const getUserById = async (id: string) => {
        // Get
        const foundUser = await userRepository.getUserById(id);

        // Check if exist
        if (!foundUser) throw new Error('User not found');

        // Remove password
        foundUser.password = undefined;

        return foundUser;
    };

    const createUser = ({ email, username, password }: CreateUserInterface) =>{
        // Gen salt
        bcrypt.genSalt(15, (err, salt) => {
            if (err) throw new Error('Something wrong with hash');

            // Hash
            bcrypt.hash(password, salt, async (err, hashed) => {
                if (err) throw new Error('Something wrong with hash');

                // Make user
                const newUser = new User();
                newUser.email = email;
                newUser.username = username;
                newUser.password = hashed;
                newUser.role = ROLES.USER;

                // Save
                try {
                    const savedUser = await userRepository.createUser(newUser);

                    // Remove password
                    savedUser.password = undefined;

                    return savedUser;
                }
                catch(err) {
                    throw new Error(err);
                }
            })
        });        
    }

    const changePassword = async ({ id, oldPassword, newPassword }: ChangePasswordInterface) => {
        // Get
        const foundUser = await userRepository.getUserById(id);

        // Check if exist
        if (!foundUser) throw new Error('User not found.');

        // Check for authorization
        bcrypt.compare(oldPassword, foundUser.password, (err, result) => {
            if (err) throw new Error('Something wrong with hash');
            if (!result) throw new Error('Unauthorized to change password');

            // Gen salt
            bcrypt.genSalt(15, (err, salt) => {
                if (err) throw new Error('Something wrongs with hash');
    
                // Hash
                bcrypt.hash(newPassword, salt, async (err, hashed) => {
                    if (err) throw new Error('Something wrongs with hash');
    
                    // Change password
                    foundUser.password = hashed;
    
                    // Updated
                    const updatedUser = await userRepository.updateUser(foundUser);

                    // Remove password
                    updatedUser.password = undefined;
    
                    return updatedUser;
                })
            });
        })
    }

    const deleteUserById = async (id: string) => {
        // Get
        const foundUser = await userRepository.getUserById(id);

        // Check if exist
        if (!foundUser) throw new Error('User not found');

        // Delete
        await userRepository.deleteUser(foundUser);
    }

    return Object.freeze({
        getAllUsers,
        getUserById,
        createUser,
        changePassword,
        deleteUserById
    });
};

export default UserService;
