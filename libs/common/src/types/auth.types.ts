import { User } from 'apps/users/src/schema/user.schema';

export interface IRegisterResponse {
  status: number;
  message: string;
  data: {
    user: Omit<User, 'password'>;
    tokens: {
      accessToken: string;
    };
  } | null;
  errors: { [key: string]: any } | null;
}

export interface ILoginResponse {
  status: number;
  message: string;
  data: {
    user: Omit<User, 'password'>;
    tokens: {
      accessToken: string;
    };
  } | null;
  errors: { [key: string]: any } | null;
}
