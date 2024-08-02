import { HttpStatus } from '@nestjs/common';
import { ErrorMessageCode } from '../types/error-message-code';
import { CustomException } from './../../config/exceptions/custom-exception';

export class InternalErrorException extends CustomException {
    constructor(messageCode: ErrorMessageCode) {
        super(messageCode, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    getStatusCode(): HttpStatus {
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
