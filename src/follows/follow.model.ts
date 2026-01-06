import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import { sequelize } from '../config/db';
import { User } from '../auth/auth.model';

export class UserFollow extends Model {
    declare id: number;
    declare followerId: number;
    declare followingId: number;
    declare status: 'pending' | 'accepted';

    declare Follower?: User;
    declare Following?: User;
}

UserFollow.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        followerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        followingId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('pending', 'accepted'),
            defaultValue: 'accepted',
        },
    },
    {
        sequelize,
        tableName: 'user_follows',
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['followerId', 'followingId'],
            },
        ],
    }
);

