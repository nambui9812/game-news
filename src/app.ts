import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import dotenv from './configs/dotenv';

const initServer = () => {
    const app = express();
    
    app.use(cors());
    app.use(morgan('dev'));
    
    app.get('/', (req, res) => {
        res.json('Server connected');
    });

    const PORT = dotenv.PORT;

    app.listen(PORT, () =>  console.log(`Server is running on port ${PORT}`));
};

export default initServer;
