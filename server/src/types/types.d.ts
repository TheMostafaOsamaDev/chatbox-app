import { ObjectId } from 'mongoose';

export type User = {
  _id: ObjectId;
  email: string;
  password: string;
  name: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
};

declare module 'express' {
  export interface Request {
    isFound?: boolean;
    user?: User;
  }
}
