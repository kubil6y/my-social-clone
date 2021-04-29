import { Response } from 'express';

// MESSAGES
export const msg500 = (error: any, res: Response) => {
  console.log(error);
  return res.status(500).send('Something went wrong');
};

export const msg401 = (res: Response) => {
  return res.status(401).send('Unauthorized');
};
