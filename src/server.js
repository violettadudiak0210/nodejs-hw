import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from './middleware/logger.js';
import notFoundHandler from './middleware/notFoundHandler.js';
import errorHandler from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import { connectMongoDB } from './db/connectMongoDB.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Підключення до MongoDB
await connectMongoDB();

// Middleware 
app.use(cors());  
app.use(express.json()); 

// Роут нотаток
app.use('/notes', notesRoutes);

// Middleware для 404
app.use(notFoundHandler);

// Глобальний обробник помилок
app.use(errorHandler);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});