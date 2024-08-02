import { HttpStatus } from '@nestjs/common';
import { ErrorMessageCode } from '../types/error-message-code';
import { CustomException } from './../../config/exceptions/custom-exception';

export class NotFoundException extends CustomException {
    constructor(messageCode: ErrorMessageCode) {
        super(messageCode, HttpStatus.NOT_FOUND);
    }

    getStatusCode(): HttpStatus {
        return HttpStatus.NOT_FOUND;
    }
}
