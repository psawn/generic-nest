import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDto } from 'src/common/dtos';

@Injectable()
export class ResponseInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return new ResponseDto(
          { statusCode: 200, message: 'OK', pagination: data.pagination },
          data,
        );
      }),
    );
  }
}
