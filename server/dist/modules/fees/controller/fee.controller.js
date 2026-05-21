"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFee = exports.updateFee = exports.createFee = exports.getFeeById = exports.getFees = void 0;
const async_handler_1 = require("@/shared/middleware/async-handler");
const fee_service_1 = require("../service/fee.service");
const fee_validator_1 = require("../validators/fee.validator");
const fee_repository_firebase_1 = require("../repository/fee.repository.firebase");
const repository = new fee_repository_firebase_1.FeeFirebaseRepository();
const service = new fee_service_1.FeeService(repository);
exports.getFees = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const result = await service.list({ page: Number(req.query.page) || 1, limit: Number(req.query.limit) || 10 });
    res.json(result);
});
exports.getFeeById = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const item = await service.get(req.params.id);
    res.json(item);
});
exports.createFee = [
    fee_validator_1.validateCreateFee,
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const item = await service.create(req.body);
        res.status(201).json(item);
    }),
];
exports.updateFee = [
    fee_validator_1.validateUpdateFee,
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const item = await service.update(req.params.id, req.body);
        res.json(item);
    }),
];
exports.deleteFee = (0, async_handler_1.asyncHandler)(async (req, res) => {
    await service.remove(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
});
