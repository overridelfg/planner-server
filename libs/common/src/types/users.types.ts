import { User } from 'apps/users/src/schema/user.schema';

export interface ICreateUsersResponse {
  status: number;
  message: string;
  data: User | null;
  errors: { [key: string]: any } | null;
}

export interface IGetAllUsersResponse {
  status: number;
  message: string;
  data: User[] | null;
  errors: { [key: string]: any } | null;
}

export interface IGetUserResponse {
  status: number;
  message: string;
  data: User | null;
  errors: { [key: string]: any } | null;
}

export interface ICheckEmailResponse {
  status: number;
  message: string;
  data: {
    message: string;
  };
  errors: { [key: string]: any } | null;
}

export interface IFindUserResponse {
  status: number;
  message: string;
  data: User | null;
  errors: { [key: string]: any } | null;
}
