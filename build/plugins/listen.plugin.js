"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListenPlugin = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = require("../config");
exports.ListenPlugin = {
    listen(app) {
        const server = (0, express_1.default)();
        server.use(app);
        server.listen(config_1.configs.PORT, () => {
            console.log(`\n Server listening on port ${config_1.configs.PORT}`);
        });
    },
};
