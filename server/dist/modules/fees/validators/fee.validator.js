"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateFee = exports.validateCreateFee = void 0;
const create_fee_dto_1 = require("../dto/create-fee.dto");
const update_fee_dto_1 = require("../dto/update-fee.dto");
const zod_1 = require("zod");
const http_status_1 = require("@/shared/constants/http-status");
const validateCreateFee = (req, res, next) => {
    try {
        req.body = create_fee_dto_1.CreateFeeSchema.parse(req.body);
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
exports.validateCreateFee = validateCreateFee;
const validateUpdateFee = (req, res, next) => {
    try {
        req.body = update_fee_dto_1.UpdateFeeSchema.parse(req.body);
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
exports.validateUpdateFee = validateUpdateFee;
