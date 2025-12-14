import app from './app';
import { sequelize } from './config/db';
import { ENV } from './config/env';

const PORT = ENV.PORT;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    await sequelize.sync();
    console.log('Models synced');

    app.listen(PORT, () =>
      console.log(`Server running on ${PORT}`)
    );
  } catch (err) {
    console.error(err);
  }
})();
