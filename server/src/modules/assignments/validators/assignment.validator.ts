import { Request, Response, NextFunction } from 'express';
import { CreateAssignmentSchema } from '../dto/create-assignment.dto';
import { UpdateAssignmentSchema } from '../dto/update-assignment.dto';
import { ZodError } from 'zod';
import { HTTP_STATUS } from '@/shared/constants/http-status';

export const validateCreateAssignment = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = CreateAssignmentSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      next({ status: HTTP_STATUS.BAD_REQUEST, message: err.errors.map(e => e.message).join(', ') });
    } else next(err);
  }
};

export const validateUpdateAssignment = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = UpdateAssignmentSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      next({ status: HTTP_STATUS.BAD_REQUEST, message: err.errors.map(e => e.message).join(', ') });
    } else next(err);
  }
};