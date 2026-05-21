import { Request, Response, NextFunction } from 'express';
import { CreateSectionSchema } from '../dto/create-section.dto';
import { UpdateSectionSchema } from '../dto/update-section.dto';
import { ZodError } from 'zod';
import { HTTP_STATUS } from '@/shared/constants/http-status';

export const validateCreateSection = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = CreateSectionSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      next({ status: HTTP_STATUS.BAD_REQUEST, message: err.errors.map(e => e.message).join(', ') });
    } else next(err);
  }
};

export const validateUpdateSection = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = UpdateSectionSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      next({ status: HTTP_STATUS.BAD_REQUEST, message: err.errors.map(e => e.message).join(', ') });
    } else next(err);
  }
};