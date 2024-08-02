import { HttpStatus } from '@nestjs/common';
import { CustomException } from 'src/config/exceptions/custom-exception';
import { ErrorMessageCode } from '../types/error-message-code';

export class BadRequestException extends CustomException {
    constructor(messageCode: ErrorMessageCode[]) {
        super(messageCode, HttpStatus.BAD_REQUEST);
    }

    getStatusCode(): HttpStatus {
        return HttpStatus.BAD_REQUEST;
    }
}
