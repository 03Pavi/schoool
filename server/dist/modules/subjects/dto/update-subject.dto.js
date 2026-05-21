"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSubjectSchema = void 0;
const create_subject_dto_1 = require("./create-subject.dto");
exports.UpdateSubjectSchema = create_subject_dto_1.CreateSubjectSchema.partial();
