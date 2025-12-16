import bcrypt from 'bcrypt';
import { User } from './auth.model';
import { TAuth } from '../types/auth';
import { generateTokens } from '../utils/jwt';

export class AuthService {
  static async signup(data: TAuth) {
    const hash = await bcrypt.hash(String(data.password), 10);
    const user = await User.create({
      ...data,
      password: hash,
    });
    return generateTokens(user.id);
  }

  static async login(username: string, password: string) {
    const user = await User.findOne({ where: { username } });
    if (!user) return null;
    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;
    return generateTokens(user.id)
  }
}
