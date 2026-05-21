import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { BookService } from '../service/book.service';
import { validateCreateBook, validateUpdateBook } from '../validators/book.validator';
import { BookFirebaseRepository } from '../repository/book.repository.firebase';

const repository = new BookFirebaseRepository();
const service = new BookService(repository);

export const getLibrary = asyncHandler(async (req: Request, res: Response) => {
  const result = await service.list({ page: Number(req.query.page) || 1, limit: Number(req.query.limit) || 10 });
  res.json(result);
});

export const getBookById = asyncHandler(async (req: Request, res: Response) => {
  const item = await service.get(req.params.id);
  res.json(item);
});

export const createBook = [
  validateCreateBook,
  asyncHandler(async (req: Request, res: Response) => {
    const item = await service.create(req.body);
    res.status(201).json(item);
  }),
];

export const updateBook = [
  validateUpdateBook,
  asyncHandler(async (req: Request, res: Response) => {
    const item = await service.update(req.params.id, req.body);
    res.json(item);
  }),
];

export const deleteBook = asyncHandler(async (req: Request, res: Response) => {
  await service.remove(req.params.id);
  res.json({ success: true, message: 'Deleted successfully' });
});