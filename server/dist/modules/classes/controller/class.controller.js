"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClass = exports.updateClass = exports.createClass = exports.getClassById = exports.getClasses = void 0;
const async_handler_1 = require("@/shared/middleware/async-handler");
const class_service_1 = require("../service/class.service");
const class_validator_1 = require("../validators/class.validator");
const class_repository_firebase_1 = require("../repository/class.repository.firebase");
const repository = new class_repository_firebase_1.ClassFirebaseRepository();
const service = new class_service_1.ClassService(repository);
exports.getClasses = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const result = await service.list({ page: Number(req.query.page) || 1, limit: Number(req.query.limit) || 10 });
    res.json(result);
});
exports.getClassById = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const item = await service.get(req.params.id);
    res.json(item);
});
exports.createClass = [
    class_validator_1.validateCreateClass,
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const item = await service.create(req.body);
        res.status(201).json(item);
    }),
];
exports.updateClass = [
    class_validator_1.validateUpdateClass,
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const item = await service.update(req.params.id, req.body);
        res.json(item);
    }),
];
exports.deleteClass = (0, async_handler_1.asyncHandler)(async (req, res) => {
    await service.remove(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
});
