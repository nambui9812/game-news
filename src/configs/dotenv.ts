import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT,
    TYPEORM: {
        TYPEORM_HOST: process.env.TYPEORM_HOST || 'localhost',
        TYPEORM_PORT: process.env.TYPEORM_PORT || 5432,
        TYPEORM_DBNAME: process.env.TYPEORM_DBNAME || 'mydb',
        TYPEORM_USERNAME: process.env.TYPEORM_USERNAME || 'postgres',
        TYPEORM_PASSWORD: process.env.TYPEORM_PASSWORD || ''
    }
};
