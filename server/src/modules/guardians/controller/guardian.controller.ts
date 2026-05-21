import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { GuardianService } from '../service/guardian.service';
import { validateCreateGuardian, validateUpdateGuardian } from '../validators/guardian.validator';
import { GuardianFirebaseRepository } from '../repository/guardian.repository.firebase';

const repository = new GuardianFirebaseRepository();
const service = new GuardianService(repository);

export const getGuardians = asyncHandler(async (req: Request, res: Response) => {
  const result = await service.list({ page: Number(req.query.page) || 1, limit: Number(req.query.limit) || 10 });
  res.json(result);
});

export const getGuardianById = asyncHandler(async (req: Request, res: Response) => {
  const item = await service.get(req.params.id);
  res.json(item);
});

export const createGuardian = [
  validateCreateGuardian,
  asyncHandler(async (req: Request, res: Response) => {
    const item = await service.create(req.body);
    res.status(201).json(item);
  }),
];

export const updateGuardian = [
  validateUpdateGuardian,
  asyncHandler(async (req: Request, res: Response) => {
    const item = await service.update(req.params.id, req.body);
    res.json(item);
  }),
];

export const deleteGuardian = asyncHandler(async (req: Request, res: Response) => {
  await service.remove(req.params.id);
  res.json({ success: true, message: 'Deleted successfully' });
});