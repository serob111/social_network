import { Router } from 'express';
import followController from './follow.controller';
import { isAuth } from '../middlewares/auth/isAuth';

const FollowRouter = Router();

FollowRouter.get('/user/followers', isAuth, followController.myFollowers);
FollowRouter.get('/followings', isAuth, followController.myFollowings);


export default FollowRouter;
