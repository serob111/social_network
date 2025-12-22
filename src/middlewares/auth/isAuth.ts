import { Request, Response, NextFunction } from 'express'
import { JwtPayload, verifyToken } from '../../utils/jwt'
import { getBearerToken } from '../../utils/get.bearer'
import { unauthorized } from '../../utils/http.responses'

export interface AuthRequest extends Request {
  user?: JwtPayload
}

export const isAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization

  if (!header) {
    return unauthorized(res, 'Authorization header missing')
  }

  const token = getBearerToken(req)

  if (token)
    try {
      const payload = verifyToken(token)
      req.user = payload
      next()
    } catch {
      return unauthorized(res, 'Invalid or expired token')
    }
}
