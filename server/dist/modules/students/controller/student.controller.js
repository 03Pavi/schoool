"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudentById = exports.getStudents = void 0;
const async_handler_1 = require("@/shared/middleware/async-handler");
const student_service_1 = require("../service/student.service");
const student_validator_1 = require("../validators/student.validator");
const student_repository_firebase_1 = require("../repository/student.repository.firebase");
const repository = new student_repository_firebase_1.StudentFirebaseRepository();
const service = new student_service_1.StudentService(repository);
exports.getStudents = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search;
    const result = await service.list({ page, limit, search });
    res.json({
        success: true,
        message: 'List of students retrieved successfully',
        data: result.items,
        meta: {
            page: result.page,
            limit: result.limit,
            total: result.total
        }
    });
});
exports.getStudentById = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const student = await service.get(id);
    res.json(student);
});
exports.createStudent = [
    student_validator_1.validateCreateStudent,
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const student = await service.create(req.body);
        res.status(201).json(student);
    }),
];
exports.updateStudent = [
    student_validator_1.validateUpdateStudent,
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const { id } = req.params;
        const student = await service.update(id, req.body);
        res.json(student);
    }),
];
exports.deleteStudent = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    await service.remove(id);
    res.json({ success: true, message: 'Student deleted' });
});
