import { BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { AppException } from './app.exception';
import { Observable, throwError } from 'rxjs';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(
    exception: AppException<number> | BadRequestException,
  ): Observable<never> | void {
    return throwError(() => ({
      message: exception.message,
    }));
  }
}
