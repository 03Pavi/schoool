"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateTeacher = exports.validateCreateTeacher = void 0;
const create_teacher_dto_1 = require("../dto/create-teacher.dto");
const update_teacher_dto_1 = require("../dto/update-teacher.dto");
const zod_1 = require("zod");
const http_status_1 = require("@/shared/constants/http-status");
const validateCreateTeacher = (req, res, next) => {
    try {
        req.body = create_teacher_dto_1.CreateTeacherSchema.parse(req.body);
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
exports.validateCreateTeacher = validateCreateTeacher;
const validateUpdateTeacher = (req, res, next) => {
    try {
        req.body = update_teacher_dto_1.UpdateTeacherSchema.parse(req.body);
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
exports.validateUpdateTeacher = validateUpdateTeacher;
