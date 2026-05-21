import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { SubjectService } from '../service/subject.service';
import { validateCreateSubject, validateUpdateSubject } from '../validators/subject.validator';
import { SubjectFirebaseRepository } from '../repository/subject.repository.firebase';

const repository = new SubjectFirebaseRepository();
const service = new SubjectService(repository);

export const getSubjects = asyncHandler(async (req: Request, res: Response) => {
  const result = await service.list({ page: Number(req.query.page) || 1, limit: Number(req.query.limit) || 10 });
  res.json(result);
});

export const getSubjectById = asyncHandler(async (req: Request, res: Response) => {
  const item = await service.get(req.params.id);
  res.json(item);
});

export const createSubject = [
  validateCreateSubject,
  asyncHandler(async (req: Request, res: Response) => {
    const item = await service.create(req.body);
    res.status(201).json(item);
  }),
];

export const updateSubject = [
  validateUpdateSubject,
  asyncHandler(async (req: Request, res: Response) => {
    const item = await service.update(req.params.id, req.body);
    res.json(item);
  }),
];

export const deleteSubject = asyncHandler(async (req: Request, res: Response) => {
  await service.remove(req.params.id);
  res.json({ success: true, message: 'Deleted successfully' });
});