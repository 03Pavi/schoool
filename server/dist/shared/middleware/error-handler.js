"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_status_1 = require("../constants/http-status");
const response_1 = require("../utils/response");
const errorHandler = (err, _req, res, _next) => {
    console.error('Error Handler:', err);
    const status = err.status || http_status_1.HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Internal Server Error';
    res.status(status).json((0, response_1.fail)(message, status));
};
exports.errorHandler = errorHandler;
