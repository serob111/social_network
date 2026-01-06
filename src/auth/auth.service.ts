import bcrypt from 'bcrypt';
import { User } from './auth.model';
import { TAuth } from '../types/auth';
import { generateTokens, verifyToken } from '../utils/jwt';
import { compareHash, doHash } from '../utils/pipe';

class AuthService {
  async signup(data: TAuth) {
    const hash = await doHash(data.password)
    const user = await User.create({
      ...data,
      password: hash,
    });
    return generateTokens(user.id);
  }

  async login(username: string, password: string) {
    const user = await User.findOne({ where: { username } });
    if (!user) return null;
    const match = compareHash(password, user.password)
    if (!match) return null;
    return generateTokens(user.id)
  }

  async getUser(userId: number) {
    try {
      const user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] },
      })
      if (!user) return null

      return user.dataValues
    } catch {
      return null
    }
  }

  async updateUsername(
    userId: number,
    newUsername: string,
    password: string
  ) {
    if (!newUsername || !password) {
      return { ok: false, message: 'Missing fields' };
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return { ok: false, message: 'User not found' };
    }

    const isValid = await compareHash(password, user.password);
    if (!isValid) {
      return { ok: false, message: 'Password is not correct' };
    }

    const existingUser = await User.findOne({
      where: { username: newUsername },
    });

    if (existingUser) {
      return { ok: false, message: 'Username is already taken' };
    }

    user.username = newUsername;
    await user.save();

    return { ok: true };
  }

  async updatePrivacy(
    userId: number,
    privacy: boolean,
  ) {
    const user = await User.findByPk(userId);
    if (!user) {
      return { ok: false, message: 'User not found' };
    }
    user.isPrivate = privacy;
    await user.save();

    return { ok: true };
  }
}
export default new AuthService()