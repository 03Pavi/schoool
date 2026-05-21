"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatResponse = void 0;
const formatResponse = (_req, res, next) => {
    const oldJson = res.json.bind(res);
    res.json = (body) => {
        const formatted = typeof body === 'object' && body !== null && 'success' in body
            ? body
            : {
                success: true,
                message: 'OK',
                data: body,
            };
        return oldJson(formatted);
    };
    next();
};
exports.formatResponse = formatResponse;
