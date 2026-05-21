"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGrade = exports.updateGrade = exports.createGrade = exports.getGradeById = exports.getGrades = void 0;
const async_handler_1 = require("@/shared/middleware/async-handler");
const grade_service_1 = require("../service/grade.service");
const grade_validator_1 = require("../validators/grade.validator");
const grade_repository_firebase_1 = require("../repository/grade.repository.firebase");
const repository = new grade_repository_firebase_1.GradeFirebaseRepository();
const service = new grade_service_1.GradeService(repository);
exports.getGrades = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const result = await service.list({ page: Number(req.query.page) || 1, limit: Number(req.query.limit) || 10 });
    res.json(result);
});
exports.getGradeById = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const item = await service.get(req.params.id);
    res.json(item);
});
exports.createGrade = [
    grade_validator_1.validateCreateGrade,
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const item = await service.create(req.body);
        res.status(201).json(item);
    }),
];
exports.updateGrade = [
    grade_validator_1.validateUpdateGrade,
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const item = await service.update(req.params.id, req.body);
        res.json(item);
    }),
];
exports.deleteGrade = (0, async_handler_1.asyncHandler)(async (req, res) => {
    await service.remove(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
});
