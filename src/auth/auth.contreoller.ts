import { Request, Response } from 'express';
import authService from './auth.service';

class AuthController {
  async signup(req: Request, res: Response) {
    const { name, surname, username, password } = req.body;
    const tokens = await authService.signup({ name, surname, username, password });
    res.status(201).json({ ok: true, ...tokens });
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    const token = await authService.login(username, password);
    if (!token)
      return res.status(404).json({ ok: false, message: 'Invalid credentials' });

    res.json({ ok: true, token });
  }

  async getUser(req: Request, res: Response) {

  }
}
export default new AuthController()
