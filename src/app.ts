import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm';

import 'reflect-metadata';

import dotenv from './configs/dotenv';

const initServer = () => {
    // Declare app
    const app = express();
    
    // Use middlewares
    app.use(cors());
    app.use(morgan('dev'));

    // Connect DB
    createConnection({
        type: 'postgres',
        host: dotenv.TYPEORM.TYPEORM_HOST,
        port: dotenv.TYPEORM.TYPEORM_PORT as number,
        database: dotenv.TYPEORM.TYPEORM_DBNAME,
        username: dotenv.TYPEORM.TYPEORM_USERNAME,
        password: dotenv.TYPEORM.TYPEORM_PASSWORD,
        synchronize: true,
        entities: [ __dirname + '/models/*.ts' ]
    })
    .then((connection) => console.log('Database connected'))
    .catch((err) => console.log(err));
    
    // Routes
    app.get('/', (req, res) => {
        res.json('Server connected');
    });

    // PORT
    const PORT = dotenv.PORT;

    // Run...
    app.listen(PORT, () =>  console.log(`Server is running on port ${PORT}`));
};

export default initServer;
