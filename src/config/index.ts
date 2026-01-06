import { User } from "../auth/auth.model";
import { UserFollow } from "../follows/follow.model";
import { Post } from "../posts/posts.model";

UserFollow.belongsTo(User, {
    foreignKey: 'followerId',
    as: 'Follower',
});

UserFollow.belongsTo(User, {
    foreignKey: 'followingId',
    as: 'Following',
});

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });
