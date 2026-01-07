import express from 'express';
import dotenv from 'dotenv';
import { AuthRouter } from './auth/auth.route';
import FollowRouter from './follows/follow.route';
import PostsRouter from './posts/posts.route';
import AccountRouter from './account/account.route';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded())

app.use('/auth', AuthRouter, FollowRouter, PostsRouter);
app.use('/account', AccountRouter);


export default app;
