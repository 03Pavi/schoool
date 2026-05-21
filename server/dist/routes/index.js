"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_routes_1 = __importDefault(require("../modules/students/routes/student.routes"));
const grade_routes_1 = __importDefault(require("../modules/grades/routes/grade.routes"));
const class_routes_1 = __importDefault(require("../modules/classes/routes/class.routes"));
const section_routes_1 = __importDefault(require("../modules/sections/routes/section.routes"));
const guardian_routes_1 = __importDefault(require("../modules/guardians/routes/guardian.routes"));
const teacher_routes_1 = __importDefault(require("../modules/teachers/routes/teacher.routes"));
const subject_routes_1 = __importDefault(require("../modules/subjects/routes/subject.routes"));
const assignment_routes_1 = __importDefault(require("../modules/assignments/routes/assignment.routes"));
const fee_routes_1 = __importDefault(require("../modules/fees/routes/fee.routes"));
const book_routes_1 = __importDefault(require("../modules/library/routes/book.routes"));
const clipboard_routes_1 = __importDefault(require("../modules/clipboard/routes/clipboard.routes"));
const router = (0, express_1.Router)();
// Root API Index
router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Campus School ERP API',
        version: '1.0.0',
        status: 'Running',
        endpoints: [
            '/api/students',
            '/api/grades',
            '/api/classes',
            '/api/classes/:class_id/sections',
            '/api/guardians',
            '/api/teachers',
            '/api/subjects',
            '/api/assignments',
            '/api/fees',
            '/api/library',
            '/api/clipboard'
        ]
    });
});
router.use('/students', student_routes_1.default);
router.use('/grades', grade_routes_1.default);
router.use('/classes', class_routes_1.default);
router.use('/classes/:class_id/sections', section_routes_1.default);
router.use('/guardians', guardian_routes_1.default);
router.use('/teachers', teacher_routes_1.default);
router.use('/subjects', subject_routes_1.default);
router.use('/assignments', assignment_routes_1.default);
router.use('/fees', fee_routes_1.default);
router.use('/library', book_routes_1.default);
router.use('/clipboard', clipboard_routes_1.default);
exports.default = router;
