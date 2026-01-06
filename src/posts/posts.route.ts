import { Router } from 'express';
import { isAuth } from '../middlewares/auth/isAuth';
import postsController from './posts.controller';

const PostsRouter = Router();

PostsRouter.get('/user/posts', isAuth, postsController.myPosts);


export default PostsRouter;
