import { NextFunction, Request, Response } from 'express';

export const trimBody = (req: Request, _: Response, next: NextFunction) => {
  const exceptions = ['password'];
  if (req.body) {
    Object.keys(req.body).forEach((key: string) => {
      if (typeof req.body[key] === 'string' && !exceptions.includes(key)) {
        req.body[key] = req.body[key].trim();
      }
    });
  }
  return next();
};
