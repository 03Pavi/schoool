import { Request, Response, NextFunction } from 'express';
import { CreateClassSchema } from '../dto/create-class.dto';
import { UpdateClassSchema } from '../dto/update-class.dto';
import { ZodError } from 'zod';
import { HTTP_STATUS } from '@/shared/constants/http-status';

export const validateCreateClass = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = CreateClassSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      next({ status: HTTP_STATUS.BAD_REQUEST, message: err.errors.map(e => e.message).join(', ') });
    } else next(err);
  }
};

export const validateUpdateClass = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = UpdateClassSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      next({ status: HTTP_STATUS.BAD_REQUEST, message: err.errors.map(e => e.message).join(', ') });
    } else next(err);
  }
};