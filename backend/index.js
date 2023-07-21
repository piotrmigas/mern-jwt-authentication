import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';

connectDB();

const app = express();
app.options('*', cors());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('API is running....');
});

app.use(notFound);
app.use(errorHandler);
app.listen(process.env.PORT, () => console.log(`Server listen on ${process.env.PORT}`));
