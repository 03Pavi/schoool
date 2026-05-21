import { Router } from 'express';
import { getSections, getSectionById, createSection, updateSection, deleteSection } from '../controller/section.controller';

const router = Router({ mergeParams: true });

router.get('/', getSections);
router.post('/', createSection);
router.get('/:id', getSectionById);
router.patch('/:id', updateSection);
router.delete('/:id', deleteSection);

export default router;