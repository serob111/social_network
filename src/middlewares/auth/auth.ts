import { Request, Response, NextFunction } from 'express'
import { TAuth } from '../../types/auth'
import { verifyToken } from '../../utils/jwt'

export interface AuthRequest extends Request {
  user?: TAuth
}

export const auth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization

  if (!header) {
    return res.status(401).json({
      ok: false,
      message: 'Authorization header missing',
    })
  }

  const [type, token] = header.split(' ')

  if (type !== 'Bearer' || !token) {
    return res.status(401).json({
      ok: false,
      message: 'Invalid authorization format',
    })
  }

  try {
    const payload = verifyToken(token)
    req.user = payload
    next()
  } catch {
    return res.status(401).json({
      ok: false,
      message: 'Invalid or expired token',
    })
  }
}
