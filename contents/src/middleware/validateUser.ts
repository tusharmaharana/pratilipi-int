import { NextFunction, Request, Response } from 'express';
import { client } from '../../proto-client';

export const validateUser = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { headers } = req;
    client.ValidateUser({ id: headers?.userid as string }, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(result);
      next();
    });
  };
};
