"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateAssignment = exports.validateCreateAssignment = void 0;
const create_assignment_dto_1 = require("../dto/create-assignment.dto");
const update_assignment_dto_1 = require("../dto/update-assignment.dto");
const zod_1 = require("zod");
const http_status_1 = require("@/shared/constants/http-status");
const validateCreateAssignment = (req, res, next) => {
    try {
        req.body = create_assignment_dto_1.CreateAssignmentSchema.parse(req.body);
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
exports.validateCreateAssignment = validateCreateAssignment;
const validateUpdateAssignment = (req, res, next) => {
    try {
        req.body = update_assignment_dto_1.UpdateAssignmentSchema.parse(req.body);
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
exports.validateUpdateAssignment = validateUpdateAssignment;
