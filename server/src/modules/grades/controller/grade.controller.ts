import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { GradeService } from '../service/grade.service';
import { validateCreateGrade, validateUpdateGrade } from '../validators/grade.validator';
import { GradeFirebaseRepository } from '../repository/grade.repository.firebase';

const repository = new GradeFirebaseRepository();
const service = new GradeService(repository);

export const getGrades = asyncHandler(async (req: Request, res: Response) => {
  const result = await service.list({ page: Number(req.query.page) || 1, limit: Number(req.query.limit) || 10 });
  res.json(result);
});

export const getGradeById = asyncHandler(async (req: Request, res: Response) => {
  const item = await service.get(req.params.id);
  res.json(item);
});

export const createGrade = [
  validateCreateGrade,
  asyncHandler(async (req: Request, res: Response) => {
    const item = await service.create(req.body);
    res.status(201).json(item);
  }),
];

export const updateGrade = [
  validateUpdateGrade,
  asyncHandler(async (req: Request, res: Response) => {
    const item = await service.update(req.params.id, req.body);
    res.json(item);
  }),
];

export const deleteGrade = asyncHandler(async (req: Request, res: Response) => {
  await service.remove(req.params.id);
  res.json({ success: true, message: 'Deleted successfully' });
});