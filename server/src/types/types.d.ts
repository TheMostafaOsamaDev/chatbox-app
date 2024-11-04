export type User = {
  _id: string;
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
