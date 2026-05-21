"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSection = exports.updateSection = exports.createSection = exports.getSectionById = exports.getSections = void 0;
const async_handler_1 = require("@/shared/middleware/async-handler");
const section_service_1 = require("../service/section.service");
const section_validator_1 = require("../validators/section.validator");
const section_repository_firebase_1 = require("../repository/section.repository.firebase");
const repository = new section_repository_firebase_1.SectionFirebaseRepository();
const service = new section_service_1.SectionService(repository);
exports.getSections = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const result = await service.list({ page: Number(req.query.page) || 1, limit: Number(req.query.limit) || 10 });
    res.json(result);
});
exports.getSectionById = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const item = await service.get(req.params.id);
    res.json(item);
});
exports.createSection = [
    section_validator_1.validateCreateSection,
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const item = await service.create(req.body);
        res.status(201).json(item);
    }),
];
exports.updateSection = [
    section_validator_1.validateUpdateSection,
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const item = await service.update(req.params.id, req.body);
        res.json(item);
    }),
];
exports.deleteSection = (0, async_handler_1.asyncHandler)(async (req, res) => {
    await service.remove(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
});
