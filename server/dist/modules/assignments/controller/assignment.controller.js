"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAssignment = exports.updateAssignment = exports.createAssignment = exports.getAssignmentById = exports.getAssignments = void 0;
const async_handler_1 = require("@/shared/middleware/async-handler");
const assignment_service_1 = require("../service/assignment.service");
const assignment_validator_1 = require("../validators/assignment.validator");
const assignment_repository_firebase_1 = require("../repository/assignment.repository.firebase");
const repository = new assignment_repository_firebase_1.AssignmentFirebaseRepository();
const service = new assignment_service_1.AssignmentService(repository);
exports.getAssignments = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const result = await service.list({ page: Number(req.query.page) || 1, limit: Number(req.query.limit) || 10 });
    res.json(result);
});
exports.getAssignmentById = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const item = await service.get(req.params.id);
    res.json(item);
});
exports.createAssignment = [
    assignment_validator_1.validateCreateAssignment,
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const item = await service.create(req.body);
        res.status(201).json(item);
    }),
];
exports.updateAssignment = [
    assignment_validator_1.validateUpdateAssignment,
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const item = await service.update(req.params.id, req.body);
        res.json(item);
    }),
];
exports.deleteAssignment = (0, async_handler_1.asyncHandler)(async (req, res) => {
    await service.remove(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
});
