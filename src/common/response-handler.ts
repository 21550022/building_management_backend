import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiResponseHandler {
  static ok<D>(message: string, data: D | D[] = null) {
    return {
      message,
      status: HttpStatus.OK,
      data,
    };
  }

  static created<D>(message: string, data: D = null) {
    return {
      message,
      status: HttpStatus.CREATED,
      data,
    };
  }

  static error(error: HttpException) {
    return error;
  }
}
