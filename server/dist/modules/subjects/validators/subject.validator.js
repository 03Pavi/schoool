"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateSubject = exports.validateCreateSubject = void 0;
const create_subject_dto_1 = require("../dto/create-subject.dto");
const update_subject_dto_1 = require("../dto/update-subject.dto");
const zod_1 = require("zod");
const http_status_1 = require("@/shared/constants/http-status");
const validateCreateSubject = (req, res, next) => {
    try {
        req.body = create_subject_dto_1.CreateSubjectSchema.parse(req.body);
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
exports.validateCreateSubject = validateCreateSubject;
const validateUpdateSubject = (req, res, next) => {
    try {
        req.body = update_subject_dto_1.UpdateSubjectSchema.parse(req.body);
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
exports.validateUpdateSubject = validateUpdateSubject;
