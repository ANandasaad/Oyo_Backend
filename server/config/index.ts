import { config } from "dotenv";
config();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const configs = {
  PORT: process.env.PORT,
  JWT_SECRET: `${process.env.JWT_SECRET}`,
  API_VERSION: `api/v1`,
  HOST: `${process.env.HOST}`,
  SALT: `${process.env.SALT}`,
  BUCKET_NAME: `${process.env.BUCKET_NAME}`,
  BUCKET_REGION: `${process.env.BUCKET_REGION}`,
  ACCESS_KEY: `${process.env.ACCESS_KEY}`,
  SECRET_ACCESS_KEY: `${process.env.SECRET_ACCESS_KEY}`,
  DISTRIBUTION_ID: `${process.env.DISTRIBUTION_ID}`,
  CLOUD_FRONT_URL: `${process.env.CLOUD_FRONT_URL}`,
};

export { configs, prisma };
