import { Router } from 'express';
import { getClipboard, getClipboardById, createClipboard, updateClipboard, deleteClipboard } from '../controller/clipboard.controller';

const router = Router();

router.get('/', getClipboard);
router.post('/', createClipboard);
router.get('/:id', getClipboardById);
router.patch('/:id', updateClipboard);
router.delete('/:id', deleteClipboard);

export default router;