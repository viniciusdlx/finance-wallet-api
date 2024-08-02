import { HttpStatus } from '@nestjs/common';
import { CustomException } from 'src/config/exceptions/custom-exception';
import { ErrorMessageCode } from '../types/error-message-code';

export class UnauthorizedException extends CustomException {
    constructor(messageCode: ErrorMessageCode[]) {
        super(messageCode, HttpStatus.UNAUTHORIZED);
    }

    getStatusCode(): HttpStatus {
        return HttpStatus.UNAUTHORIZED;
    }
}
