"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGuardian = exports.updateGuardian = exports.createGuardian = exports.getGuardianById = exports.getGuardians = void 0;
const async_handler_1 = require("@/shared/middleware/async-handler");
const guardian_service_1 = require("../service/guardian.service");
const guardian_validator_1 = require("../validators/guardian.validator");
const guardian_repository_firebase_1 = require("../repository/guardian.repository.firebase");
const repository = new guardian_repository_firebase_1.GuardianFirebaseRepository();
const service = new guardian_service_1.GuardianService(repository);
exports.getGuardians = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const result = await service.list({ page: Number(req.query.page) || 1, limit: Number(req.query.limit) || 10 });
    res.json(result);
});
exports.getGuardianById = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const item = await service.get(req.params.id);
    res.json(item);
});
exports.createGuardian = [
    guardian_validator_1.validateCreateGuardian,
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const item = await service.create(req.body);
        res.status(201).json(item);
    }),
];
exports.updateGuardian = [
    guardian_validator_1.validateUpdateGuardian,
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const item = await service.update(req.params.id, req.body);
        res.json(item);
    }),
];
exports.deleteGuardian = (0, async_handler_1.asyncHandler)(async (req, res) => {
    await service.remove(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
});
