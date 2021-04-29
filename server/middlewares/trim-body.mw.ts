import { NextFunction, Request, Response } from 'express';

const exceptionFields = ['password'];

// recursive trim body function with exception fields
function trimObj(obj: any) {
  if (!Array.isArray(obj) && typeof obj != 'object') return obj;
  return Object.keys(obj).reduce(
    function (acc, key) {
      acc[key.trim()] =
        !exceptionFields.includes(key) && typeof obj[key] == 'string'
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
