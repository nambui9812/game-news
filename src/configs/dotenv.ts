import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT,
    TYPEORM: {
        MONGO_URI: process.env.MONGO_URI
    },
    JWT: {
        SECRET_KEY: process.env.JWT_SECRET_KEY
    }
};
