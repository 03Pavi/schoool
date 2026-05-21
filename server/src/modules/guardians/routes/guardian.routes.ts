import { Router } from 'express';
import { getGuardians, getGuardianById, createGuardian, updateGuardian, deleteGuardian } from '../controller/guardian.controller';

const router = Router();

router.get('/', getGuardians);
router.post('/', createGuardian);
router.get('/:id', getGuardianById);
router.patch('/:id', updateGuardian);
router.delete('/:id', deleteGuardian);

export default router;