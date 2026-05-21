"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateSection = exports.validateCreateSection = void 0;
const create_section_dto_1 = require("../dto/create-section.dto");
const update_section_dto_1 = require("../dto/update-section.dto");
const zod_1 = require("zod");
const http_status_1 = require("@/shared/constants/http-status");
const validateCreateSection = (req, res, next) => {
    try {
        req.body = create_section_dto_1.CreateSectionSchema.parse(req.body);
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
exports.validateCreateSection = validateCreateSection;
const validateUpdateSection = (req, res, next) => {
    try {
        req.body = update_section_dto_1.UpdateSectionSchema.parse(req.body);
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
exports.validateUpdateSection = validateUpdateSection;
