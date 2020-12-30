import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { v4 } from 'uuid';
import multer from 'multer';
import AWS from 'aws-sdk';

import 'reflect-metadata';

import dotenv from './configs/dotenv';
import UsersRouter from './routes/users/UsersRouter';
import GamesRouter from './routes/games/GamesRouter';

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

    // Multer storage
    const storage = multer.memoryStorage();
    const upload = multer({ storage });
    
    // AWS
    const s3 = new AWS.S3({
        credentials: new AWS.Credentials({ accessKeyId: dotenv.AWS.ID, secretAccessKey: dotenv.AWS.SECRET })
    });
    
    // Routes
    app.get('/', (req, res) => {
        res.json('Server connected');
    });

    app.use(UsersRouter);
    app.use(GamesRouter);

    // Upload file test
    app.post('/upload-image', upload.single('image'), (req, res) => {
        // Get file information
        const fileArray = req.file.originalname.split('.');
        const fileExtension = fileArray[fileArray.length - 1];
        const fileRandomName = v4();
        
        // upload to AWS S3
        s3.upload({
            Bucket: dotenv.AWS.BUCKET_NAME,
            Key: `${fileRandomName}.${fileExtension}`,
            Body: req.file.buffer
        }, (err, data) => {
            if (err) {
                console.log(err);
                res.status(404).json({ message: 'Upload failed' })
            }
            else {
                res.status(200).json({
                    message: 'Uploaded',
                    data
                });
            }
        });
    });

    // PORT
    const PORT = dotenv.PORT;

    // Run...
    app.listen(PORT, () =>  console.log(`Server is running on port ${PORT}`));
};

export default initServer;
