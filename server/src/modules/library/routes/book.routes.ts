import { Router } from 'express';
import { getLibrary, getBookById, createBook, updateBook, deleteBook } from '../controller/book.controller';

const router = Router();

router.get('/', getLibrary);
router.post('/', createBook);
router.get('/:id', getBookById);
router.patch('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;