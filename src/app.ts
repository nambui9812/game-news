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
        type: 'mongodb',
        url: `mongodb+srv://nambui9812:${dotenv.TYPEORM.TYPEORM_PASSWORD}@${dotenv.TYPEORM.TYPEORM_HOST}/${dotenv.TYPEORM.TYPEORM_DBNAME}?retryWrites=true&w=majority`,
        authSource: 'admin',
        useUnifiedTopology: true,
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
