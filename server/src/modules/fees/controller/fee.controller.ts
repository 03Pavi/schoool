import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { FeeService } from '../service/fee.service';
import { validateCreateFee, validateUpdateFee } from '../validators/fee.validator';
import { FeeFirebaseRepository } from '../repository/fee.repository.firebase';

const repository = new FeeFirebaseRepository();
const service = new FeeService(repository);

export const getFees = asyncHandler(async (req: Request, res: Response) => {
  const result = await service.list({ page: Number(req.query.page) || 1, limit: Number(req.query.limit) || 10 });
  res.json(result);
});

export const getFeeById = asyncHandler(async (req: Request, res: Response) => {
  const item = await service.get(req.params.id);
  res.json(item);
});

export const createFee = [
  validateCreateFee,
  asyncHandler(async (req: Request, res: Response) => {
    const item = await service.create(req.body);
    res.status(201).json(item);
  }),
];

export const updateFee = [
  validateUpdateFee,
  asyncHandler(async (req: Request, res: Response) => {
    const item = await service.update(req.params.id, req.body);
    res.json(item);
  }),
];

export const deleteFee = asyncHandler(async (req: Request, res: Response) => {
  await service.remove(req.params.id);
  res.json({ success: true, message: 'Deleted successfully' });
});