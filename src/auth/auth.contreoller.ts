import { Request, Response } from 'express';
import { AuthService } from './auth.service';

export class AuthController {
  static async signup(req: Request, res: Response) {
    const { name, surname, username, password } = req.body;
    const tokens = await AuthService.signup({ name, surname, username, password });
    res.status(201).json({ ok: true, ...tokens });
  }

  static async login(req: Request, res: Response) {
    const { username, password } = req.body;

    const token = await AuthService.login(username, password);
    if (!token)
      return res.status(404).json({ ok: false, message: 'Invalid credentials' });

    res.json({ ok: true, token });
  }
  
  static async getUser(req: Request, res: Response) {
   
  }
}
