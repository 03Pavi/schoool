import { Router } from 'express';
import { getFees, getFeeById, createFee, updateFee, deleteFee } from '../controller/fee.controller';

const router = Router();

router.get('/', getFees);
router.post('/', createFee);
router.get('/:id', getFeeById);
router.patch('/:id', updateFee);
router.delete('/:id', deleteFee);

export default router;