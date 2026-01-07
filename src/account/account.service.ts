import { Op } from "sequelize";
import { User } from "../auth/auth.model";

 class AccountService {
    async searchByUserName(username: string) {
        if (!username || username.length < 1) return [];

        return User.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `${username}%` } },
                    { surname: { [Op.like]: `${username}%` } },
                    { username: { [Op.like]: `${username}%` } },
                ],
            },
            attributes: [
                'name',
                'surname',
                'username',
            ],
        });
    }
    async searchByUserById(id: string) {
        if (!id) return [];

        return User.findOne({
            where: { id },
            attributes: [
              'id',
              'name',
              'surname',
              'username',
            ],
          });
    }
}
export default new AccountService()