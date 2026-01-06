import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

export class Post extends Model {
  declare id: number;
  declare userId: number;
  declare content: string;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'user_posts',
    timestamps: true,
  }
);
