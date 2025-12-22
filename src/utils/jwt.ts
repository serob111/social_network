import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

export interface JwtPayload {
  id: number
}

export const generateTokens = (userId: number) => {
  const accessToken = jwt.sign(
    { id: userId },
    ENV.JWT.ACCESS_SECRET,
    { expiresIn: ENV.JWT.ACCESS_EXPIRES_IN }
  );

  const refreshToken = jwt.sign(
    { id: userId },
    ENV.JWT.REFRESH_SECRET,
    { expiresIn: ENV.JWT.REFRESH_EXPIRES_IN }
  );

  return {
    accessToken,
    refreshToken,
  };
};



export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(
    token,
    ENV.JWT.ACCESS_SECRET
  ) as JwtPayload
}
