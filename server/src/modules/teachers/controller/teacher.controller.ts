import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { TeacherService } from '../service/teacher.service';
import { validateCreateTeacher, validateUpdateTeacher } from '../validators/teacher.validator';
import { TeacherFirebaseRepository } from '../repository/teacher.repository.firebase';

const repository = new TeacherFirebaseRepository();
const service = new TeacherService(repository);

export const getTeachers = asyncHandler(async (req: Request, res: Response) => {
  const result = await service.list({ page: Number(req.query.page) || 1, limit: Number(req.query.limit) || 10 });
  res.json(result);
});

export const getTeacherById = asyncHandler(async (req: Request, res: Response) => {
  const item = await service.get(req.params.id);
  res.json(item);
});

export const createTeacher = [
  validateCreateTeacher,
  asyncHandler(async (req: Request, res: Response) => {
    const item = await service.create(req.body);
    res.status(201).json(item);
  }),
];

export const updateTeacher = [
  validateUpdateTeacher,
  asyncHandler(async (req: Request, res: Response) => {
    const item = await service.update(req.params.id, req.body);
    res.json(item);
  }),
];

export const deleteTeacher = asyncHandler(async (req: Request, res: Response) => {
  await service.remove(req.params.id);
  res.json({ success: true, message: 'Deleted successfully' });
});