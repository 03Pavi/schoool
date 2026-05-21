import { Router } from 'express';
import { getTeachers, getTeacherById, createTeacher, updateTeacher, deleteTeacher } from '../controller/teacher.controller';

const router = Router();

router.get('/', getTeachers);
router.post('/', createTeacher);
router.get('/:id', getTeacherById);
router.patch('/:id', updateTeacher);
router.delete('/:id', deleteTeacher);

export default router;