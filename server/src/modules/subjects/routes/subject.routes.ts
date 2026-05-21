import { Router } from 'express';
import { getSubjects, getSubjectById, createSubject, updateSubject, deleteSubject } from '../controller/subject.controller';

const router = Router();

router.get('/', getSubjects);
router.post('/', createSubject);
router.get('/:id', getSubjectById);
router.patch('/:id', updateSubject);
router.delete('/:id', deleteSubject);

export default router;