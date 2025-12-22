import { Request, Response } from 'express';
import authService from './auth.service';
import { created, serverError, notFound, success } from '../utils/http.responses';
import { getBearerToken } from '../utils/get.bearer';
import { compareHash } from '../utils/pipe';
import { ReqWithUser } from '../types/auth';


class AuthController {
  async signup(req: Request, res: Response) {
    try {
      const { name, surname, username, password } = req.body;
      const tokens = await authService.signup({
        name,
        surname,
        username,
        password,
      });

      return created(res, tokens, 'User registered');
    } catch (err) {
      return serverError(res, err);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const token = await authService.login(username, password);
      if (!token) {
        return notFound(res, 'Invalid credentials');
      }

      return success(res, { token }, 'Login successful');
    } catch (err) {
      return serverError(res, err);
    }
  }

  async getUser(req: Request, res: Response) {
    const userId = (req as ReqWithUser).user?.id
    const user = await authService.getUser(userId as number)
    if (!user) {
      notFound(res, 'User not found')
    }
    return success(res, user)
  }
}

export default new AuthController();
