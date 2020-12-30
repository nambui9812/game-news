import multer from 'multer';

// Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload middlewares
export const singleUpload = upload.single('file');
export const multipleUpload = upload.array('files');
