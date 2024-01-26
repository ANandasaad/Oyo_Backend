import { config } from "dotenv";
config();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const configs = {
  PORT: process.env.PORT,
  JWT_SECRET: `${process.env.JWT_SECRET}`,
  API_VERSION: `api/v1`,
  HOST: `${process.env.HOST}`,
};

export { configs, prisma };
