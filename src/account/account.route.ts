import { Router } from "express";
import { isAuth } from "../middlewares/auth/isAuth";
import accountController from "./account.controller";
import followController from "../follows/follow.controller";

const AccountRouter = Router()

AccountRouter.get('/search/:username', isAuth, accountController.searchAccount)
AccountRouter.get('/:id', isAuth, accountController.searchAccountById)
AccountRouter.post('/:id/follow', isAuth, followController.follow)
AccountRouter.get('/requsts', isAuth, followController.followRequests)




export default AccountRouter;