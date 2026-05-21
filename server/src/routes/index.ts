import { Router } from 'express';
import studentRoutes from '../modules/students/routes/student.routes';
import gradeRoutes from '../modules/grades/routes/grade.routes';
import classRoutes from '../modules/classes/routes/class.routes';
import sectionRoutes from '../modules/sections/routes/section.routes';
import guardianRoutes from '../modules/guardians/routes/guardian.routes';
import teacherRoutes from '../modules/teachers/routes/teacher.routes';
import subjectRoutes from '../modules/subjects/routes/subject.routes';
import assignmentRoutes from '../modules/assignments/routes/assignment.routes';
import feeRoutes from '../modules/fees/routes/fee.routes';
import bookRoutes from '../modules/library/routes/book.routes';
import clipboardRoutes from '../modules/clipboard/routes/clipboard.routes';

const router = Router();

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

router.use('/students', studentRoutes);
router.use('/grades', gradeRoutes);
router.use('/classes', classRoutes);
router.use('/classes/:class_id/sections', sectionRoutes);
router.use('/guardians', guardianRoutes);
router.use('/teachers', teacherRoutes);
router.use('/subjects', subjectRoutes);
router.use('/assignments', assignmentRoutes);
router.use('/fees', feeRoutes);
router.use('/library', bookRoutes);
router.use('/clipboard', clipboardRoutes);

export default router;
