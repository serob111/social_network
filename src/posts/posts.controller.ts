import { Request, Response } from 'express';
import { success, notFound, serverError } from '../utils/http.responses';
import { ReqWithUser } from '../types/auth';
import psotsService from './psots.service';

class PostsController {

    async myPosts(req: Request, res: Response) {
        try {
            const meId = (req as ReqWithUser).user!.id;
            const posts = await psotsService.getPosts(meId);
            return success(res, posts);
        } catch (err) {
            return serverError(res, err);
        }
    }

}

export default new PostsController();
