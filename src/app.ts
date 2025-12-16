import express from 'express';
import dotenv from 'dotenv';
import { AuthRouter } from './auth/auth.route';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded())

app.use('/auth', AuthRouter);


export default app;
