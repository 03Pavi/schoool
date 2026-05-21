"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBookSchema = void 0;
const create_book_dto_1 = require("./create-book.dto");
exports.UpdateBookSchema = create_book_dto_1.CreateBookSchema.partial();
