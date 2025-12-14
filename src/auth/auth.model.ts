import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

export class User extends Model {
  declare id: number;
  declare name: string;
  declare surname: string;
  declare username: string;
  declare password: string;
  declare isPrivate: boolean;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    isPrivate: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { sequelize, tableName: 'users' }
);
