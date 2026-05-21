import { Request, Response, NextFunction } from 'express';
import { CreateBookSchema } from '../dto/create-book.dto';
import { UpdateBookSchema } from '../dto/update-book.dto';
import { ZodError } from 'zod';
import { HTTP_STATUS } from '@/shared/constants/http-status';

export const validateCreateBook = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = CreateBookSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      next({ status: HTTP_STATUS.BAD_REQUEST, message: err.errors.map(e => e.message).join(', ') });
    } else next(err);
  }
};

export const validateUpdateBook = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = UpdateBookSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      next({ status: HTTP_STATUS.BAD_REQUEST, message: err.errors.map(e => e.message).join(', ') });
    } else next(err);
  }
};