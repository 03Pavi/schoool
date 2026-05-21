"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClipboard = exports.updateClipboard = exports.createClipboard = exports.getClipboardById = exports.getClipboard = void 0;
const async_handler_1 = require("@/shared/middleware/async-handler");
const clipboard_service_1 = require("../service/clipboard.service");
const clipboard_validator_1 = require("../validators/clipboard.validator");
const clipboard_repository_firebase_1 = require("../repository/clipboard.repository.firebase");
const repository = new clipboard_repository_firebase_1.ClipboardFirebaseRepository();
const service = new clipboard_service_1.ClipboardService(repository);
exports.getClipboard = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const result = await service.list({ page: Number(req.query.page) || 1, limit: Number(req.query.limit) || 10 });
    res.json(result);
});
exports.getClipboardById = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const item = await service.get(req.params.id);
    res.json(item);
});
exports.createClipboard = [
    clipboard_validator_1.validateCreateClipboard,
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const item = await service.create(req.body);
        res.status(201).json(item);
    }),
];
exports.updateClipboard = [
    clipboard_validator_1.validateUpdateClipboard,
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const item = await service.update(req.params.id, req.body);
        res.json(item);
    }),
];
exports.deleteClipboard = (0, async_handler_1.asyncHandler)(async (req, res) => {
    await service.remove(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
});
