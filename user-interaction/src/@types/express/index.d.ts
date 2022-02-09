import { Request } from 'express';

export interface IRawUser {
  _id: number;
  email: string;
  password: string;
}
export type IUser = Omit<IRawUser, '_id'>;
export type ICleanUser = Omit<IRawUser, 'password'>;

export interface IRequest extends Request<{}, null, IUser> {
  user: ICleanUser;
}

declare namespace Express {
  export interface Request {
    user: ICleanUser;
  }
}
