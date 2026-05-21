"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateGrade = exports.validateCreateGrade = void 0;
const create_grade_dto_1 = require("../dto/create-grade.dto");
const update_grade_dto_1 = require("../dto/update-grade.dto");
const zod_1 = require("zod");
const http_status_1 = require("@/shared/constants/http-status");
const validateCreateGrade = (req, res, next) => {
    try {
        req.body = create_grade_dto_1.CreateGradeSchema.parse(req.body);
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
exports.validateCreateGrade = validateCreateGrade;
const validateUpdateGrade = (req, res, next) => {
    try {
        req.body = update_grade_dto_1.UpdateGradeSchema.parse(req.body);
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
exports.validateUpdateGrade = validateUpdateGrade;
