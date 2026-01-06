import { User } from '../auth/auth.model';
import { UserFollow } from './follow.model';

class FollowService {
    async getFollowers(userId: number) {
        const rows = await UserFollow.findAll({
            where: {
                followingId: userId,
                status: 'accepted',
            },
            include: [
                {
                    model: User,
                    as: 'Follower',
                    attributes: ['id', 'username', 'name', 'surname'],
                },
            ],
        });

        return rows.map(r => r.Follower);
    }

    async getFollowings(userId: number) {
        const rows = await UserFollow.findAll({
            where: {
                followerId: userId,
                status: 'accepted',
            },
            include: [
                {
                    model: User,
                    as: 'Following',
                    attributes: ['id', 'username', 'name', 'surname'],
                },
            ],
        });

        return rows.map(r => r.Following);
    }

    async follow(meId: number, targetUserId: number) {
        if (meId === targetUserId) {
            return { ok: false, message: 'You cannot follow yourself' };
        }

        const target = await User.findByPk(targetUserId);
        if (!target) {
            return { ok: false, message: 'User not found' };
        }

        const status = target.isPrivate ? 'pending' : 'accepted';

        await UserFollow.create({
            followerId: meId,
            followingId: targetUserId,
            status,
        });

        return { ok: true, status };
    }

    async unfollow(meId: number, targetUserId: number) {
        await UserFollow.destroy({
            where: {
                followerId: meId,
                followingId: targetUserId,
            },
        });

        return { ok: true };
    }
}

export default new FollowService();
