import { CODE_ERRORS } from '@common/constants/message-errors';
import { HttpException, InternalServerErrorException } from '@nestjs/common';

export const handleError = (error: any, code = 403) => {
  console.log('error---->', error);
  if (error.code) {
    throw new HttpException(getMessageError(error.code), code);
  }
  throw new InternalServerErrorException();
};

const getMessageError = (httpCode: number): string => {
  if (!Object.prototype.hasOwnProperty.call(CODE_ERRORS, httpCode)) {
    return CODE_ERRORS.INTERNAL_SERVER_ERROR;
  }
  return CODE_ERRORS[httpCode];
};
