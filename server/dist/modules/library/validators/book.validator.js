"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateBook = exports.validateCreateBook = void 0;
const create_book_dto_1 = require("../dto/create-book.dto");
const update_book_dto_1 = require("../dto/update-book.dto");
const zod_1 = require("zod");
const http_status_1 = require("@/shared/constants/http-status");
const validateCreateBook = (req, res, next) => {
    try {
        req.body = create_book_dto_1.CreateBookSchema.parse(req.body);
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
exports.validateCreateBook = validateCreateBook;
const validateUpdateBook = (req, res, next) => {
    try {
        req.body = update_book_dto_1.UpdateBookSchema.parse(req.body);
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
exports.validateUpdateBook = validateUpdateBook;
