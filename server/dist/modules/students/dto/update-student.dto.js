"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStudentSchema = void 0;
const create_student_dto_1 = require("./create-student.dto");
exports.UpdateStudentSchema = create_student_dto_1.CreateStudentSchema.partial();
