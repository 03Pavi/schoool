import { Router } from 'express';
import { getClasses, getClassById, createClass, updateClass, deleteClass } from '../controller/class.controller';

const router = Router();

router.get('/', getClasses);
router.post('/', createClass);
router.get('/:id', getClassById);
router.patch('/:id', updateClass);
router.delete('/:id', deleteClass);

export default router;