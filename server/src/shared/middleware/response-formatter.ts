import { Request, Response, NextFunction } from 'express';

export const formatResponse = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  const oldJson = res.json.bind(res);
  res.json = (body: any) => {
    const formatted =
      typeof body === 'object' && body !== null && 'success' in body
        ? body
        : {
            success: true,
            message: 'OK',
            data: body,
          };
    return oldJson(formatted);
  };
  next();
};