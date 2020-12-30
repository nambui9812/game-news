import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT,
    TYPEORM: {
        MONGO_URI: process.env.MONGO_URI
    },
    JWT: {
        SECRET_KEY: process.env.JWT_SECRET_KEY
    },
    AWS: {
        ID: process.env.AWS_ACCESS_ID,
        SECRET: process.env.AWS_ACCESS_SECRET,
        BUCKET_NAME: process.env.AWS_BUCKET_NAME
    }
};
