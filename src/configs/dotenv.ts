import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT,
    TYPEORM: {
        TYPEORM_HOST: process.env.TYPEORM_HOST,
        TYPEORM_DBNAME: process.env.TYPEORM_DBNAME,
        TYPEORM_PASSWORD: process.env.TYPEORM_PASSWORD
    }
};
