import { Router } from 'express'
import { validate } from '../middlewares/auth/validator'
import { User } from './auth.model'
import { isAuth } from '../middlewares/auth/isAuth'
import authContreoller from './auth.contreoller'

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
  authContreoller.signup
)

router.post(
  '/login',
  validate([
    { field: 'username', required: true },
    { field: 'password', required: true },
  ]),
  authContreoller.login
)

router.get(
  '/user',
  isAuth,
  authContreoller.getUser
)

export const AuthRouter = router
