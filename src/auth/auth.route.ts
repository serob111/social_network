import { Router } from 'express'
import { AuthController } from './auth.contreoller'
import { validate } from '../middlewares/auth/validator'
import { User } from './auth.model'
import { isAuth } from '../middlewares/auth/isAuth'

const router = Router()

router.post(
  '/signup',
  validate([
    {
      field: 'username',
      required: true,
      minLength: 3,
      unique: async (value) => {
        const user = await User.findOne({ where: { username: value } })
        return !user
      },
    },
    {
      field: 'password',
      required: true,
      minLength: 6,
    },
  ]),
  AuthController.signup
)

router.post(
  '/login',
  validate([
    { field: 'username', required: true },
    { field: 'password', required: true },
  ]),
  AuthController.login
)

router.get(
  '/user',
  isAuth,
  AuthController.getUser
)

export const AuthRouter = router
