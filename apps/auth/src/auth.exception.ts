import { AppError, AppException } from '@app/common/app.exception';

export enum AuthError {
  ThereIsNoJwtSecret = AppError.JWT,
}

export class AuthException extends AppException<AuthError> {}
