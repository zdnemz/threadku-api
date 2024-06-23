import dotenv from "dotenv";

dotenv.config();

export const env = {
    // app
    NODE_ENV: process.env.NODE_ENV || "development",
    APP_PORT: Number(process.env.APP_PORT),
    APP_HOST: process.env.APP_HOST as string,
    // cors
    CORS_ORIGIN: process.env.CORS_ORIGIN as string || "*",
    // jwt
    JWT_SECRET: process.env.JWT_SECRET as string,
    // mongodb
    MONGO_URL: process.env.MONGO_URL as string,
    MONGO_DB: process.env.MONGO_DB as string,
    // redis
    REDIS_HOST: process.env.REDIS_HOST as string,
    REDIS_PORT: Number(process.env.REDIS_PORT),
    REDIS_USERNAME: process.env.REDIS_USERNAME as string,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD as string,
    REDIS_DB: Number(process.env.REDIS_DB),
    // mailer
    MAILER_HOST: process.env.MAILER_HOST,
    MAILER_PORT: Number(process.env.MAILER_PORT),
    MAILER_USER: process.env.MAILER_USER,
    MAILER_PASSWORD: process.env.MAILER_PASSWORD,
    MAILER_FROM: process.env.MAILER_FROM,
    
};