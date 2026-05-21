import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../constants/http-status';
import { fail } from '../utils/response';

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error('Error Handler:', err);
  const status = err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal Server Error';
  res.status(status).json(fail(message, status));
};