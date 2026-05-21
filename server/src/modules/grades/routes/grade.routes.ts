import { Router } from 'express';
import { getGrades, getGradeById, createGrade, updateGrade, deleteGrade } from '../controller/grade.controller';

const router = Router();

router.get('/', getGrades);
router.post('/', createGrade);
router.get('/:id', getGradeById);
router.patch('/:id', updateGrade);
router.delete('/:id', deleteGrade);

export default router;