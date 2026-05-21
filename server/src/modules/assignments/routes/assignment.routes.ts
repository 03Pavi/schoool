import { Router } from 'express';
import { getAssignments, getAssignmentById, createAssignment, updateAssignment, deleteAssignment } from '../controller/assignment.controller';

const router = Router();

router.get('/', getAssignments);
router.post('/', createAssignment);
router.get('/:id', getAssignmentById);
router.patch('/:id', updateAssignment);
router.delete('/:id', deleteAssignment);

export default router;