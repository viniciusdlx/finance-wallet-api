import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessageCode } from 'src/shared/types/error-message-code';

export class CustomException extends HttpException {
    readonly messageCodes: ErrorMessageCode[];

    constructor(
        messageCodes: ErrorMessageCode | ErrorMessageCode[],
        statusCode: HttpStatus,
    ) {
        const messagesArray = Array.isArray(messageCodes)
            ? messageCodes
            : [messageCodes];

        super({ errors: messagesArray }, statusCode);
        this.messageCodes = messagesArray;
    }

    getStatusCode(): HttpStatus {
        return this.getStatus();
    }

    getMessageCodes(): ErrorMessageCode[] {
        return this.messageCodes;
    }

    getErrorMessage(): string {
        return this.message;
    }
}
