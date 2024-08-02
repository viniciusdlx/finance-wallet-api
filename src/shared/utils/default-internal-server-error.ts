import { InternalErrorException } from '../exceptions/internal-error.exception';
import { ErrorCodesEnum } from './../enums/error-codes.enum';
import { ErrorMessagesEnum } from './../enums/error-messages.enum';

export function defaultInternalServerError() {
    throw new InternalErrorException({
        message: ErrorMessagesEnum.INTERNAL_ERROR,
        code: ErrorCodesEnum.INTERNAL_ERROR,
    });
}
