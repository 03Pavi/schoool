"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubject = exports.updateSubject = exports.createSubject = exports.getSubjectById = exports.getSubjects = void 0;
const async_handler_1 = require("@/shared/middleware/async-handler");
const subject_service_1 = require("../service/subject.service");
const subject_validator_1 = require("../validators/subject.validator");
const subject_repository_firebase_1 = require("../repository/subject.repository.firebase");
const repository = new subject_repository_firebase_1.SubjectFirebaseRepository();
const service = new subject_service_1.SubjectService(repository);
exports.getSubjects = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const result = await service.list({ page: Number(req.query.page) || 1, limit: Number(req.query.limit) || 10 });
    res.json(result);
});
exports.getSubjectById = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const item = await service.get(req.params.id);
    res.json(item);
});
exports.createSubject = [
    subject_validator_1.validateCreateSubject,
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const item = await service.create(req.body);
        res.status(201).json(item);
    }),
];
exports.updateSubject = [
    subject_validator_1.validateUpdateSubject,
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const item = await service.update(req.params.id, req.body);
        res.json(item);
    }),
];
exports.deleteSubject = (0, async_handler_1.asyncHandler)(async (req, res) => {
    await service.remove(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
});
