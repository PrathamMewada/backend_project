import dotenv from "dotenv-safe";

dotenv.config({ allowEmptyValues: true, path: `.env.${process.env.NODE_ENV}` });

const ENVIRONMENT = process.env.NODE_ENV ?? "development";
const MONGO_HOST = process.env.MONGO_HOST ?? "localhost";
const MONGO_DATABASE = process.env.MONGO_DATABASE ?? "bookingdb";
const MONGO_PORT = process.env.MONGO_PORT ?? "27017";
const MONGO_URL = process.env.MONGO_URL ?? `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;

export const config = {
  environment: ENVIRONMENT,
  mongo: {
    url: MONGO_URL
  }
};