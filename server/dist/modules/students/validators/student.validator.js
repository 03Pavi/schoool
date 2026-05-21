"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateStudent = exports.validateCreateStudent = void 0;
const create_student_dto_1 = require("../dto/create-student.dto");
const update_student_dto_1 = require("../dto/update-student.dto");
const zod_1 = require("zod");
const http_status_1 = require("@/shared/constants/http-status");
const validateCreateStudent = (req, _res, next) => {
    try {
        req.body = create_student_dto_1.CreateStudentSchema.parse(req.body);
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            const message = err.errors.map(e => e.message).join(', ');
            next({ status: http_status_1.HTTP_STATUS.BAD_REQUEST, message });
        }
        else
            next(err);
    }
};
exports.validateCreateStudent = validateCreateStudent;
const validateUpdateStudent = (req, _res, next) => {
    try {
        req.body = update_student_dto_1.UpdateStudentSchema.parse(req.body);
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            const message = err.errors.map(e => e.message).join(', ');
            next({ status: http_status_1.HTTP_STATUS.BAD_REQUEST, message });
        }
        else
            next(err);
    }
};
exports.validateUpdateStudent = validateUpdateStudent;
