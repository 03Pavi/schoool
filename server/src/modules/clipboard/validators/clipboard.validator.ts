import { Request, Response, NextFunction } from 'express';
import { CreateClipboardSchema } from '../dto/create-clipboard.dto';
import { UpdateClipboardSchema } from '../dto/update-clipboard.dto';
import { ZodError } from 'zod';
import { HTTP_STATUS } from '@/shared/constants/http-status';

export const validateCreateClipboard = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = CreateClipboardSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      next({ status: HTTP_STATUS.BAD_REQUEST, message: err.errors.map(e => e.message).join(', ') });
    } else next(err);
  }
};

export const validateUpdateClipboard = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = UpdateClipboardSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      next({ status: HTTP_STATUS.BAD_REQUEST, message: err.errors.map(e => e.message).join(', ') });
    } else next(err);
  }
};