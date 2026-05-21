import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { StudentService } from '../service/student.service';
import { validateCreateStudent, validateUpdateStudent } from '../validators/student.validator';
import { StudentFirebaseRepository } from '../repository/student.repository.firebase';

const repository = new StudentFirebaseRepository();
const service = new StudentService(repository);

export const getStudents = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string;
  const result = await service.list({ page, limit, search });
  res.json({
    success: true,
    message: 'List of students retrieved successfully',
    data: result.items,
    meta: {
      page: result.page,
      limit: result.limit,
      total: result.total
    }
  });
});

export const getStudentById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const student = await service.get(id);
  res.json(student);
});

export const createStudent = [
  validateCreateStudent,
  asyncHandler(async (req: Request, res: Response) => {
    const student = await service.create(req.body);
    res.status(201).json(student);
  }),
];

export const updateStudent = [
  validateUpdateStudent,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const student = await service.update(id, req.body);
    res.json(student);
  }),
];

export const deleteStudent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await service.remove(id);
  res.json({ success: true, message: 'Student deleted' });
});