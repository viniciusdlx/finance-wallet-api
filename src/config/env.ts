import * as dotenv from 'dotenv';
dotenv.config();

export const dbEnvs = {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
};

export const jwtConstants = {
    secret: process.env.AUTH_SECRET,
    expiresIn: process.env.EXPIRES_IN,
};

export const redis = {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
};
