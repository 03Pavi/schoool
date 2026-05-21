"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBookById = exports.getLibrary = void 0;
const async_handler_1 = require("@/shared/middleware/async-handler");
const book_service_1 = require("../service/book.service");
const book_validator_1 = require("../validators/book.validator");
const book_repository_firebase_1 = require("../repository/book.repository.firebase");
const repository = new book_repository_firebase_1.BookFirebaseRepository();
const service = new book_service_1.BookService(repository);
exports.getLibrary = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const result = await service.list({ page: Number(req.query.page) || 1, limit: Number(req.query.limit) || 10 });
    res.json(result);
});
exports.getBookById = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const item = await service.get(req.params.id);
    res.json(item);
});
exports.createBook = [
    book_validator_1.validateCreateBook,
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const item = await service.create(req.body);
        res.status(201).json(item);
    }),
];
exports.updateBook = [
    book_validator_1.validateUpdateBook,
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const item = await service.update(req.params.id, req.body);
        res.json(item);
    }),
];
exports.deleteBook = (0, async_handler_1.asyncHandler)(async (req, res) => {
    await service.remove(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
});
