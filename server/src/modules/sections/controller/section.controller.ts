import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { SectionService } from '../service/section.service';
import { validateCreateSection, validateUpdateSection } from '../validators/section.validator';
import { SectionFirebaseRepository } from '../repository/section.repository.firebase';

const repository = new SectionFirebaseRepository();
const service = new SectionService(repository);

export const getSections = asyncHandler(async (req: Request, res: Response) => {
  const result = await service.list({ page: Number(req.query.page) || 1, limit: Number(req.query.limit) || 10 });
  res.json(result);
});

export const getSectionById = asyncHandler(async (req: Request, res: Response) => {
  const item = await service.get(req.params.id);
  res.json(item);
});

export const createSection = [
  validateCreateSection,
  asyncHandler(async (req: Request, res: Response) => {
    const item = await service.create(req.body);
    res.status(201).json(item);
  }),
];

export const updateSection = [
  validateUpdateSection,
  asyncHandler(async (req: Request, res: Response) => {
    const item = await service.update(req.params.id, req.body);
    res.json(item);
  }),
];

export const deleteSection = asyncHandler(async (req: Request, res: Response) => {
  await service.remove(req.params.id);
  res.json({ success: true, message: 'Deleted successfully' });
});