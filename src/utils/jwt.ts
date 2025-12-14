import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
import { ENV } from '../config/env'

export const signToken = (
  payload: object,
  expiresIn: SignOptions['expiresIn'] = '7d'
) => {
  return jwt.sign(payload, ENV.JWT.SECRET, { expiresIn })
}

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, ENV.JWT.SECRET) as JwtPayload
}
