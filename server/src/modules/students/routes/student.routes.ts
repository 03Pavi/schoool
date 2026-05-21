import { Router } from 'express';
import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../controller/student.controller';

const router = Router();

router.get('/', getStudents);
router.post('/', createStudent);
router.get('/:id', getStudentById);
router.patch('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;