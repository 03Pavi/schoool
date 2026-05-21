import { Request, Response, NextFunction } from 'express';
import { CreateGuardianSchema } from '../dto/create-guardian.dto';
import { UpdateGuardianSchema } from '../dto/update-guardian.dto';
import { ZodError } from 'zod';
import { HTTP_STATUS } from '@/shared/constants/http-status';

export const validateCreateGuardian = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = CreateGuardianSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      next({ status: HTTP_STATUS.BAD_REQUEST, message: err.errors.map(e => e.message).join(', ') });
    } else next(err);
  }
};

export const validateUpdateGuardian = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = UpdateGuardianSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      next({ status: HTTP_STATUS.BAD_REQUEST, message: err.errors.map(e => e.message).join(', ') });
    } else next(err);
  }
};