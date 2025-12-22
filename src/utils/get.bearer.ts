import { Request } from 'express'

export const getBearerToken = (req: Request): string | null => {
  const header = req.headers.authorization
  if (!header) return null

  const [scheme, token] = header.split(' ')
  if (scheme !== 'Bearer' || !token) return null

  return token
}
