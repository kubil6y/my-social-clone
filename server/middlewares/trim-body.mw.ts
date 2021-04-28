import { NextFunction, Request, Response } from 'express';

function trimObj(obj) {
  if (!Array.isArray(obj) && typeof obj != 'object') return obj;
  return Object.keys(obj).reduce(
    function (acc, key) {
      acc[key.trim()] =
        key !== 'password' && typeof obj[key] == 'string'
          ? obj[key].trim()
          : trimObj(obj[key]);
      return acc;
    },
    Array.isArray(obj) ? [] : {}
  );
}

export const trimBody = (req: Request, _: Response, next: NextFunction) => {
  if (req.body) {
    req.body = trimObj(req.body);
  }

  return next();
};
