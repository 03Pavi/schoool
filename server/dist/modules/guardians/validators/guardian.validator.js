"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateGuardian = exports.validateCreateGuardian = void 0;
const create_guardian_dto_1 = require("../dto/create-guardian.dto");
const update_guardian_dto_1 = require("../dto/update-guardian.dto");
const zod_1 = require("zod");
const http_status_1 = require("@/shared/constants/http-status");
const validateCreateGuardian = (req, res, next) => {
    try {
        req.body = create_guardian_dto_1.CreateGuardianSchema.parse(req.body);
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
exports.validateCreateGuardian = validateCreateGuardian;
const validateUpdateGuardian = (req, res, next) => {
    try {
        req.body = update_guardian_dto_1.UpdateGuardianSchema.parse(req.body);
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
exports.validateUpdateGuardian = validateUpdateGuardian;
