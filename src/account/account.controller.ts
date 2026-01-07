import { Request, Response } from "express"
import { serverError, success } from "../utils/http.responses";
import accountService from "./account.service";

class AccountController {
    async searchAccount(req: Request, res: Response) {
        try {
            const { username } = req.params;

            const users = await accountService.searchByUserName(username);
            return success(res,users);

        } catch (err) {
            return serverError(res, err)
        }
    }
    async searchAccountById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const user = await accountService.searchByUserById(id);
            return success(res,user);

        } catch (err) {
            return serverError(res, err)
        }
    }
}
export default new AccountController()