import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { AssignmentService } from '../service/assignment.service';
import { validateCreateAssignment, validateUpdateAssignment } from '../validators/assignment.validator';
import { AssignmentFirebaseRepository } from '../repository/assignment.repository.firebase';

const repository = new AssignmentFirebaseRepository();
const service = new AssignmentService(repository);

export const getAssignments = asyncHandler(async (req: Request, res: Response) => {
  const result = await service.list({ page: Number(req.query.page) || 1, limit: Number(req.query.limit) || 10 });
  res.json(result);
});

export const getAssignmentById = asyncHandler(async (req: Request, res: Response) => {
  const item = await service.get(req.params.id);
  res.json(item);
});

export const createAssignment = [
  validateCreateAssignment,
  asyncHandler(async (req: Request, res: Response) => {
    const item = await service.create(req.body);
    res.status(201).json(item);
  }),
];

export const updateAssignment = [
  validateUpdateAssignment,
  asyncHandler(async (req: Request, res: Response) => {
    const item = await service.update(req.params.id, req.body);
    res.json(item);
  }),
];

export const deleteAssignment = asyncHandler(async (req: Request, res: Response) => {
  await service.remove(req.params.id);
  res.json({ success: true, message: 'Deleted successfully' });
});