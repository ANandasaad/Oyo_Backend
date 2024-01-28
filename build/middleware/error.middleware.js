"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(err, req, res, next) {
    console.error(err === null || err === void 0 ? void 0 : err.name);
    const msg = (err === null || err === void 0 ? void 0 : err.message) || "Something went wrong!";
    const status = (err === null || err === void 0 ? void 0 : err.status) || 500;
    res.status(status).json({ success: false, msg });
}
exports.errorHandler = errorHandler;
