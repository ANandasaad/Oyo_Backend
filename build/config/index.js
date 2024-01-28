"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.configs = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
const configs = {
    PORT: process.env.PORT,
    JWT_SECRET: `${process.env.JWT_SECRET}`,
    API_VERSION: `api/v1`,
    HOST: `${process.env.HOST}`,
};
exports.configs = configs;
