import { Router } from 'express'
import authController from './auth.contreoller'
import { User } from './auth.model'
import { validate } from './auth.validator'
import { isAuth } from '../middlewares/auth/isAuth'

const router = Router()

router.post(
  '/signup',
  validate([
    {
      field: 'username',
      required: true,
      unique: async (value) => {
        const user = await User.findOne({
          where: { username: value },
        })
        return !user
      },
    },
    { field: 'name', required: true },
    { field: 'surname', required: true },
    { field: 'password', required: true, minLength: 6 },
  ]),
  authController.signup
)

router.post(
  '/login',
  validate([
    {
      field: 'username',
      required: true,
    },
    { field: 'password', required: true },
  ]),
  authController.login
)

router.get(
  '/user',
  isAuth,
  authController.getUser
)

router.patch(
  '/user/username',
  isAuth,
  authController.updateUsername
);

router.patch(
  '/user/privacy',
  isAuth,
  authController.updatePrivacy
);


export const AuthRouter = router
