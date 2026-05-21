import { Request, Response, NextFunction } from 'express';
import { CreateGradeSchema } from '../dto/create-grade.dto';
import { UpdateGradeSchema } from '../dto/update-grade.dto';
import { ZodError } from 'zod';
import { HTTP_STATUS } from '@/shared/constants/http-status';

export const validateCreateGrade = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = CreateGradeSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      next({ status: HTTP_STATUS.BAD_REQUEST, message: err.errors.map(e => e.message).join(', ') });
    } else next(err);
  }
};

export const validateUpdateGrade = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = UpdateGradeSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      next({ status: HTTP_STATUS.BAD_REQUEST, message: err.errors.map(e => e.message).join(', ') });
    } else next(err);
  }
};