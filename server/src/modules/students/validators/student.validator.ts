import { Request, Response, NextFunction } from 'express';
import { CreateStudentSchema } from '../dto/create-student.dto';
import { UpdateStudentSchema } from '../dto/update-student.dto';
import { ZodError } from 'zod';
import { HTTP_STATUS } from '@/shared/constants/http-status';

export const validateCreateStudent = (req: Request, _res: Response, next: NextFunction) => {
  try {
    req.body = CreateStudentSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      const message = err.errors.map(e => e.message).join(', ');
      next({ status: HTTP_STATUS.BAD_REQUEST, message });
    } else next(err);
  }
};

export const validateUpdateStudent = (req: Request, _res: Response, next: NextFunction) => {
  try {
    req.body = UpdateStudentSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      const message = err.errors.map(e => e.message).join(', ');
      next({ status: HTTP_STATUS.BAD_REQUEST, message });
    } else next(err);
  }
};