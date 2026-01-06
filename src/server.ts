import app from './app';
import { User } from './auth/auth.model';
import { sequelize } from './config/db';
import { ENV } from './config/env';
import { UserFollow } from './follows/follow.model';

const PORT = ENV.PORT;

UserFollow.belongsTo(User, {
  foreignKey: 'followerId',
  as: 'Follower',
});

UserFollow.belongsTo(User, {
  foreignKey: 'followingId',
  as: 'Following',
});


(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    await sequelize.sync({ force: false });
    console.log('Models synced');

    app.listen(PORT, () =>
      console.log(`Server running on ${PORT}`)
    );
  } catch (err) {
    console.error(err);
  }
})();
