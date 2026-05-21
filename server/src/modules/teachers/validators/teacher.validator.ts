import { Request, Response, NextFunction } from 'express';
import { CreateTeacherSchema } from '../dto/create-teacher.dto';
import { UpdateTeacherSchema } from '../dto/update-teacher.dto';
import { ZodError } from 'zod';
import { HTTP_STATUS } from '@/shared/constants/http-status';

export const validateCreateTeacher = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = CreateTeacherSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      next({ status: HTTP_STATUS.BAD_REQUEST, message: err.errors.map(e => e.message).join(', ') });
    } else next(err);
  }
};

export const validateUpdateTeacher = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = UpdateTeacherSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      next({ status: HTTP_STATUS.BAD_REQUEST, message: err.errors.map(e => e.message).join(', ') });
    } else next(err);
  }
};