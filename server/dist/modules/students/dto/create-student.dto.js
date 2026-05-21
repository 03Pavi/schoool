"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStudentSchema = void 0;
const zod_1 = require("zod");
exports.CreateStudentSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    roll_number: zod_1.z.string(),
    class_section: zod_1.z.string(),
    enrollment_date: zod_1.z.string(),
});
