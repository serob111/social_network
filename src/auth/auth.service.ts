import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from './auth.model';
import { TAuth } from '../types/auth';

export class AuthService {
  static async signup(data: TAuth) {
    const hash = await bcrypt.hash(String(data.password), 10);
    return User.create({ ...data, password: hash });
  }

  static async login(username: string, password: string) {
    const user = await User.findOne({ where: { username } });
    if (!user) return null;

    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;

    return jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });
  }
}
