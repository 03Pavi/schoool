"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateClipboard = exports.validateCreateClipboard = void 0;
const create_clipboard_dto_1 = require("../dto/create-clipboard.dto");
const update_clipboard_dto_1 = require("../dto/update-clipboard.dto");
const zod_1 = require("zod");
const http_status_1 = require("@/shared/constants/http-status");
const validateCreateClipboard = (req, res, next) => {
    try {
        req.body = create_clipboard_dto_1.CreateClipboardSchema.parse(req.body);
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            next({ status: http_status_1.HTTP_STATUS.BAD_REQUEST, message: err.errors.map(e => e.message).join(', ') });
        }
        else
            next(err);
    }
};
exports.validateCreateClipboard = validateCreateClipboard;
const validateUpdateClipboard = (req, res, next) => {
    try {
        req.body = update_clipboard_dto_1.UpdateClipboardSchema.parse(req.body);
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            next({ status: http_status_1.HTTP_STATUS.BAD_REQUEST, message: err.errors.map(e => e.message).join(', ') });
        }
        else
            next(err);
    }
};
exports.validateUpdateClipboard = validateUpdateClipboard;
