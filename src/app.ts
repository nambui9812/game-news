import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm';

import 'reflect-metadata';

import dotenv from './configs/dotenv';
import UsersRouter from './routes/users/UsersRouter';

const initServer = () => {
    // Declare app
    const app = express();
    
    // Use middlewares
    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Connect DB
    createConnection({
        type: 'mongodb',
        url: dotenv.TYPEORM.MONGO_URI,
        useUnifiedTopology: true,
        synchronize: true,
        entities: [ __dirname + '/models/*.ts' ]
    })
    .then((connection) => console.log('Database connected'))
    .catch((err) => console.log(err));
    
    // Routes
    app.get('/', (req, res) => {
        res.json('Server connected');
    });

    app.use(UsersRouter);

    // PORT
    const PORT = dotenv.PORT;

    // Run...
    app.listen(PORT, () =>  console.log(`Server is running on port ${PORT}`));
};

export default initServer;
