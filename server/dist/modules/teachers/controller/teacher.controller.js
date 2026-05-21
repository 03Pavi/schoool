"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeacher = exports.updateTeacher = exports.createTeacher = exports.getTeacherById = exports.getTeachers = void 0;
const async_handler_1 = require("@/shared/middleware/async-handler");
const teacher_service_1 = require("../service/teacher.service");
const teacher_validator_1 = require("../validators/teacher.validator");
const teacher_repository_firebase_1 = require("../repository/teacher.repository.firebase");
const repository = new teacher_repository_firebase_1.TeacherFirebaseRepository();
const service = new teacher_service_1.TeacherService(repository);
exports.getTeachers = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const result = await service.list({ page: Number(req.query.page) || 1, limit: Number(req.query.limit) || 10 });
    res.json(result);
});
exports.getTeacherById = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const item = await service.get(req.params.id);
    res.json(item);
});
exports.createTeacher = [
    teacher_validator_1.validateCreateTeacher,
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const item = await service.create(req.body);
        res.status(201).json(item);
    }),
];
exports.updateTeacher = [
    teacher_validator_1.validateUpdateTeacher,
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const item = await service.update(req.params.id, req.body);
        res.json(item);
    }),
];
exports.deleteTeacher = (0, async_handler_1.asyncHandler)(async (req, res) => {
    await service.remove(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
});
