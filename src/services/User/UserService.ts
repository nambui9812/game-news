import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import AWS from 'aws-sdk';

import UserRepository from '../../repositories/UserRepository';
import { ROLES } from '../../configs/contants';
import {
    CreateUserInterface,
    ChangePasswordInterface,
    AuthenticateInterface,
    ChangeRoleInterface,
    ChangeAvatarInterface
} from './UserInterfaces';
import User from '../../models/User';
import dotenv from '../../configs/dotenv';

const UserService = () => {
    const userRepository = UserRepository();

    // AWS
    const s3 = new AWS.S3({
        credentials: new AWS.Credentials({ accessKeyId: dotenv.AWS.ID, secretAccessKey: dotenv.AWS.SECRET })
    });

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

    const createUser = async ({ email, username, password }: CreateUserInterface) =>{
        try {
            // Check if email || username has been used
            const userByEmail = userRepository.getUserByEmail(email);
            const userByUsername = userRepository.getUserByUsername(username);

            const res = await Promise.all([userByEmail, userByUsername]);

            if (res[0] || res[1]) throw new Error('Email or username has been used');

            // Gen salt
            const salt = await bcrypt.genSalt(10);

            // Hash
            const hashed = await bcrypt.hash(password, salt);

            // Make user
            const newUser = new User();
            newUser.email = email;
            newUser.username = username;
            newUser.password = hashed;
            newUser.role = ROLES.USER;

            // Save
            const savedUser = await userRepository.createUser(newUser);

            // Remove password
            savedUser.password = undefined;

            return savedUser;
        }
        catch(err) {
            throw new Error(err);
        }      
    };

    const deleteUserById = async (userId: string, id: string, role: number) => {
        // Get
        const foundUser = await userRepository.getUserById(userId);

        // Check if exist
        if (!foundUser) throw new Error('User not found');

        // Admin cannot delete Manager !!!
        if (role === ROLES.ADMIN && foundUser.role === ROLES.MANAGER) throw new Error('Unauthorized');

        // Admin cannot delete another Admin !!!
        if (role === ROLES.ADMIN && id !== userId) throw new Error('Unauthorized');

        // Delete
        await userRepository.deleteUser(foundUser);
    };

    const changePassword = async ({ id, oldPassword, newPassword }: ChangePasswordInterface) => {
        try {
            // Get
            const foundUser = await userRepository.getUserById(id);

            // Check if exist
            if (!foundUser) throw new Error('User not found.');

            // Check for authorization
            const match = await bcrypt.compare(oldPassword, foundUser.password);
            if (!match) throw new Error('Unauthorized to change password');

            // Gen salt
            const salt = await bcrypt.genSalt(10);

            // Hash
            const hashed = await bcrypt.hash(newPassword, salt);

            // Change password
            foundUser.password = hashed;
    
            // Updated
            const updatedUser = await userRepository.updateUser(foundUser);

            // Remove password
            updatedUser.password = undefined;

            return updatedUser;
        }
        catch(err) {
            throw new Error(err);
        }
    };

    const authenticate = async ({ username, password }: AuthenticateInterface) => {
        // Get
        const foundUser = await userRepository.getUserByUsername(username);
        
        // Check if exist
        if (!foundUser) throw new Error('Wrong username or password');

        // Authenticate
        const match = await bcrypt.compare(password, foundUser.password);
        
        if (!match) throw new Error('Wrong username or password');

        // Remove password
        foundUser.password = undefined;

        // Create jwt
        const token = jwt.sign(
            { id: foundUser.id, username: foundUser.username, role: foundUser.role },
            dotenv.JWT.SECRET_KEY,
            { algorithm: 'HS256', expiresIn: '1h' } // 1 hour
        );
        
        return {
            user: foundUser,
            token
        };
    };

    const changeRole = async ({ role, userId, newUserRole }: ChangeRoleInterface) => {
        try {
            // Get
            const foundUser = await userRepository.getUserById(userId);

            // Check if exist
            if (!foundUser) throw new Error('User not found.');

            // Admin can not change role of Manager
            if (role === ROLES.ADMIN && foundUser.role === ROLES.MANAGER) throw new Error('Unauthorized');

            // Admin can not change role of other Admin
            if (role === ROLES.ADMIN && foundUser.role === ROLES.ADMIN) throw new Error('Unauthorized');

            // Change role
            foundUser.role = newUserRole;
    
            // Updated
            const updatedUser = await userRepository.updateUser(foundUser);

            // Remove password
            updatedUser.password = undefined;

            return updatedUser;
        }
        catch(err) {
            throw new Error(err);
        }
    };

    const changeAvatar = async ({ id, file }: ChangeAvatarInterface) => {
        try {
            // Get
            const foundUser = await userRepository.getUserById(id);

            // Check if exist
            if (!foundUser) throw new Error('User not found.');

            // Remove old avatar if having
            if (foundUser.avatarUrl) {
                // Get the key of object in s3
                const arr = foundUser.avatarUrl.split('/');
                const key = arr[arr.length - 1];

                // Remove
                await s3.deleteObject({ Bucket: dotenv.AWS.BUCKET_NAME, Key: key }).promise();
                foundUser.avatarUrl = null;
            }

            // If having file in request
            if (file) {
                // Upload new avatar to s3 and assign avatar url to user
                const fileArray = file.originalname.split('.');
                const fileExtension = fileArray[fileArray.length - 1];
                const fileRandomName = v4();

                const response = await s3.upload({
                    Bucket: dotenv.AWS.BUCKET_NAME,
                    Key: `${fileRandomName}.${fileExtension}`,
                    Body: file.buffer
                }).promise();

                // Update avatar url
                foundUser.avatarUrl = response.Location;
            }
    
            // Updated
            const updatedUser = await userRepository.updateUser(foundUser);

            // Remove password
            updatedUser.password = undefined;

            return updatedUser;
        }
        catch(err) {
            throw new Error(err);
        }
    };

    return Object.freeze({
        getAllUsers,
        getUserById,
        createUser,
        deleteUserById,
        changePassword,
        authenticate,
        changeRole,
        changeAvatar
    });
};

export default UserService;
