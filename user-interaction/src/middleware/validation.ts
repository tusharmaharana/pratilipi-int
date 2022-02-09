import { NextFunction, Request, Response } from 'express';

type Message = {
  message: string;
};
type validateRes = Response<Message>;

export const validate = async (req: Request, res: validateRes, next: NextFunction): Promise<validateRes | void> => {
  const headers = req.headers;
  try {
    if (!headers.userId) return res.status(400).send({ message: 'not authenticated' });
    //@ts-expect-error
    if (!headers.userId == req.user._id) return res.status(401).send({ message: 'not authorized' });
    return res.status(200);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};
