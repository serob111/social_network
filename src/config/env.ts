import 'dotenv/config';

export const ENV = {
  PORT: Number(process.env.PORT ?? 3000),

  DB: {
    HOST: process.env.DB_HOST!,
    PORT: Number(process.env.DB_PORT ?? 3306),
    USER: process.env.DB_USER!,
    PASS: process.env.DB_PASS!,
    NAME: process.env.DB_NAME!,
  },

  JWT: {
    ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
    ACCESS_EXPIRES_IN: '15m',
    REFRESH_EXPIRES_IN: '7d',
  },

  NODE_ENV: process.env.NODE_ENV ?? 'development',
} as const;
