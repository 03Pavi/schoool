import { Request, Response, NextFunction } from 'express';
import { CreateFeeSchema } from '../dto/create-fee.dto';
import { UpdateFeeSchema } from '../dto/update-fee.dto';
import { ZodError } from 'zod';
import { HTTP_STATUS } from '@/shared/constants/http-status';

export const validateCreateFee = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = CreateFeeSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      next({ status: HTTP_STATUS.BAD_REQUEST, message: err.errors.map(e => e.message).join(', ') });
    } else next(err);
  }
};

export const validateUpdateFee = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = UpdateFeeSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      next({ status: HTTP_STATUS.BAD_REQUEST, message: err.errors.map(e => e.message).join(', ') });
    } else next(err);
  }
};