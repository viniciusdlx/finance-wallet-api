import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
    UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { ErrorMessageCode } from 'src/shared/types/error-message-code';
import { CustomException } from './custom-exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let internalMessageCode: ErrorMessageCode = {
            message: ErrorMessagesEnum.INTERNAL_ERROR,
            code: ErrorCodesEnum.INTERNAL_ERROR,
            details: exception?.message,
        };

        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

        if (exception instanceof UnauthorizedException) {
            internalMessageCode = {
                message: ErrorMessagesEnum.UNAUTHORIZED,
                code: ErrorCodesEnum.UNAUTHORIZED,
            };
            statusCode = exception?.getStatus();
        }

        const status =
            exception instanceof CustomException
                ? exception.getStatusCode()
                : statusCode;

        const errors =
            exception instanceof CustomException
                ? exception.getMessageCodes()
                : internalMessageCode;

        console.log('details: ', internalMessageCode?.details);

        return response
            .status(status)
            .json({ statusCode: status, errors: errors });
    }
}
