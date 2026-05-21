import { Request, Response, NextFunction } from 'express';
import { CreateSubjectSchema } from '../dto/create-subject.dto';
import { UpdateSubjectSchema } from '../dto/update-subject.dto';
import { ZodError } from 'zod';
import { HTTP_STATUS } from '@/shared/constants/http-status';

export const validateCreateSubject = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = CreateSubjectSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      next({ status: HTTP_STATUS.BAD_REQUEST, message: err.errors.map(e => e.message).join(', ') });
    } else next(err);
  }
};

export const validateUpdateSubject = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = UpdateSubjectSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      next({ status: HTTP_STATUS.BAD_REQUEST, message: err.errors.map(e => e.message).join(', ') });
    } else next(err);
  }
};