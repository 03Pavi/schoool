import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { ClipboardService } from '../service/clipboard.service';
import { validateCreateClipboard, validateUpdateClipboard } from '../validators/clipboard.validator';
import { ClipboardFirebaseRepository } from '../repository/clipboard.repository.firebase';

const repository = new ClipboardFirebaseRepository();
const service = new ClipboardService(repository);

export const getClipboard = asyncHandler(async (req: Request, res: Response) => {
  const result = await service.list({ page: Number(req.query.page) || 1, limit: Number(req.query.limit) || 10 });
  res.json(result);
});

export const getClipboardById = asyncHandler(async (req: Request, res: Response) => {
  const item = await service.get(req.params.id);
  res.json(item);
});

export const createClipboard = [
  validateCreateClipboard,
  asyncHandler(async (req: Request, res: Response) => {
    const item = await service.create(req.body);
    res.status(201).json(item);
  }),
];

export const updateClipboard = [
  validateUpdateClipboard,
  asyncHandler(async (req: Request, res: Response) => {
    const item = await service.update(req.params.id, req.body);
    res.json(item);
  }),
];

export const deleteClipboard = asyncHandler(async (req: Request, res: Response) => {
  await service.remove(req.params.id);
  res.json({ success: true, message: 'Deleted successfully' });
});