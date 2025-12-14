import 'dotenv/config'


export const ENV = {
  PORT: Number(process.env.PORT ?? 3000),

  DB: {
    HOST: process.env.DB_HOST,
    PORT: Number(process.env.DB_PORT ?? 3306),
    USER: process.env.DB_USER as string,
    PASS: process.env.DB_PASS as string,
    NAME: process.env.DB_NAME as string,
  },

  JWT: {
    SECRET: process.env.JWT_SECRET as string,
  },

  NODE_ENV: process.env.NODE_ENV ?? 'development',
} as const
