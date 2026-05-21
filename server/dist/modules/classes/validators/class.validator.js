"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateClass = exports.validateCreateClass = void 0;
const create_class_dto_1 = require("../dto/create-class.dto");
const update_class_dto_1 = require("../dto/update-class.dto");
const zod_1 = require("zod");
const http_status_1 = require("@/shared/constants/http-status");
const validateCreateClass = (req, res, next) => {
    try {
        req.body = create_class_dto_1.CreateClassSchema.parse(req.body);
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
exports.validateCreateClass = validateCreateClass;
const validateUpdateClass = (req, res, next) => {
    try {
        req.body = update_class_dto_1.UpdateClassSchema.parse(req.body);
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
exports.validateUpdateClass = validateUpdateClass;
