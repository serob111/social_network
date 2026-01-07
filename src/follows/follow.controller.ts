import { Request, Response } from 'express';
import followService from './follow.service';
import { success, notFound, serverError } from '../utils/http.responses';
import { ReqWithUser } from '../types/auth';

class FollowController {

    async myFollowers(req: Request, res: Response) {
        try {
            const meId = (req as ReqWithUser).user!.id;
            const followers = await followService.getFollowers(meId);
            return success(res, followers);
        } catch (err) {
            return serverError(res, err);
        }
    }

    async myFollowings(req: Request, res: Response) {
        try {
            const meId = (req as ReqWithUser).user!.id;
            const followings = await followService.getFollowings(meId);
            return success(res, followings);
        } catch (err) {
            return serverError(res, err);
        }
    }
    
    async follow(req: Request, res: Response) {
        try {
            const meId = (req as ReqWithUser).user?.id;
            const targetUserId = Number(req.params.id);

            const result = await followService.follow(meId!, targetUserId);

            if (!result.ok) {
                return notFound(res, result.message);
            }

            return success(res, { status: result.status });
        } catch (err) {
            return serverError(res, err);
        }
    }

    async unfollow(req: Request, res: Response) {
        try {
            const meId = (req as ReqWithUser).user?.id;
            const targetUserId = Number(req.params.id);

            await followService.unfollow(meId!, targetUserId);
            return success(res);
        } catch (err) {
            return serverError(res, err);
        }
    }

    async followRequests(req: Request, res: Response) {
        try {
          const meId = (req as ReqWithUser).user!.id;
    
          const users = await followService.getFollowRequests(meId);
    
          return success(res, { users });
        } catch (err) {
          return serverError(res, err);
        }
      }
}

export default new FollowController();
