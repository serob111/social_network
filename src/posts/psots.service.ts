import { UserFollow } from '../follows/follow.model';
import { Post } from './posts.model';

class PostService {
    async getPosts(userId: number) {
        return Post.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']],
        });
    }
}

export default new PostService();
