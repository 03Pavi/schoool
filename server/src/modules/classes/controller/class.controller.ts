import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { ClassService } from '../service/class.service';
import { validateCreateClass, validateUpdateClass } from '../validators/class.validator';
import { ClassFirebaseRepository } from '../repository/class.repository.firebase';

const repository = new ClassFirebaseRepository();
const service = new ClassService(repository);

export const getClasses = asyncHandler(async (req: Request, res: Response) => {
  const result = await service.list({ page: Number(req.query.page) || 1, limit: Number(req.query.limit) || 10 });
  res.json(result);
});

export const getClassById = asyncHandler(async (req: Request, res: Response) => {
  const item = await service.get(req.params.id);
  res.json(item);
});

export const createClass = [
  validateCreateClass,
  asyncHandler(async (req: Request, res: Response) => {
    const item = await service.create(req.body);
    res.status(201).json(item);
  }),
];

export const updateClass = [
  validateUpdateClass,
  asyncHandler(async (req: Request, res: Response) => {
    const item = await service.update(req.params.id, req.body);
    res.json(item);
  }),
];

export const deleteClass = asyncHandler(async (req: Request, res: Response) => {
  await service.remove(req.params.id);
  res.json({ success: true, message: 'Deleted successfully' });
});